import { Injectable } from '@nestjs/common';
import { ServiceRepositoryPort } from '../../domain/ports/service.repository.port';
import { Service } from '../../domain/entities/service.entity';
import * as k8s from 'kubernetes-client';
import { V1Deployment, V1Service as K8sService } from 'kubernetes-client';

/**
 * Implementación del repositorio de servicios usando el cliente de Kubernetes.
 * Se encarga de interactuar con el cluster para desplegar, gestionar y monitorear servicios.
 */
@Injectable()
export class KubernetesServiceRepository implements ServiceRepositoryPort {
    private readonly k8sClient: k8s.Client;

    constructor() {
        this.k8sClient = new k8s.Client({
            version: '1.23',
            config: k8s.config.fromKubeconfig()
        });
    }

    async deployService(service: Service): Promise<Service> {
        try {
            const namespace = service.namespace || 'default';

            // Crear o actualizar el Deployment
            const deployment: V1Deployment = {
                metadata: {
                    name: service.name,
                    namespace,
                    labels: {
                        app: service.name
                    }
                },
                spec: {
                    replicas: service.replicas || 1,
                    selector: {
                        matchLabels: {
                            app: service.name
                        }
                    },
                    template: {
                        metadata: {
                            labels: {
                                app: service.name
                            }
                        },
                        spec: {
                            containers: [{
                                name: service.name,
                                image: service.image,
                                ports: [{
                                    containerPort: service.targetPort
                                }],
                                env: service.environmentVariables.map(env => {
                                    const [name, value] = env.split('=');
                                    return { name, value };
                                }),
                                resources: {
                                    limits: {
                                        cpu: service.cpuLimit,
                                        memory: service.memoryLimit
                                    }
                                },
                                livenessProbe: service.healthCheckPath ? {
                                    httpGet: {
                                        path: service.healthCheckPath,
                                        port: service.targetPort
                                    },
                                    initialDelaySeconds: 30,
                                    periodSeconds: 10
                                } : undefined,
                                readinessProbe: service.healthCheckPath ? {
                                    httpGet: {
                                        path: service.healthCheckPath,
                                        port: service.targetPort
                                    },
                                    initialDelaySeconds: 5,
                                    periodSeconds: 5
                                } : undefined
                            }]
                        }
                    }
                }
            };

            // Crear o actualizar el Service
            const k8sService: K8sService = {
                metadata: {
                    name: service.name,
                    namespace
                },
                spec: {
                    type: service.isPublic ? 'LoadBalancer' : 'ClusterIP',
                    ports: [{
                        port: service.port,
                        targetPort: service.targetPort
                    }],
                    selector: {
                        app: service.name
                    }
                }
            };

            await this.k8sClient.apis.apps.v1.namespaces(namespace).deployments.post({ body: deployment });
            await this.k8sClient.api.v1.namespaces(namespace).services.post({ body: k8sService });

            return service;
        } catch (error) {
            throw new Error(`Failed to deploy service ${service.name}: ${error.message}`);
        }
    }

    async getServiceById(id: string): Promise<Service | null> {
        try {
            const namespace = 'default';
            const deployment = await this.k8sClient.apis.apps.v1.namespaces(namespace).deployments(id).get();
            const k8sService = await this.k8sClient.api.v1.namespaces(namespace).services(id).get();

            if (!deployment.body || !k8sService.body) {
                return null;
            }

            const container = deployment.body.spec.template.spec.containers[0];
            const envVars = container.env?.map(env => `${env.name}=${env.value}`) || [];

            return new Service(
                deployment.body.metadata.uid,
                deployment.body.metadata.name,
                container.image,
                k8sService.body.spec.ports[0].port,
                container.ports[0].containerPort,
                k8sService.body.spec.type === 'LoadBalancer',
                envVars,
                deployment.body.spec.replicas,
                container.resources?.limits?.cpu,
                container.resources?.limits?.memory,
                deployment.body.metadata.namespace,
                container.livenessProbe?.httpGet?.path
            );
        } catch (error) {
            if (error.statusCode === 404) {
                return null;
            }
            throw new Error(`Failed to get service ${id}: ${error.message}`);
        }
    }

    async listServices(): Promise<Service[]> {
        try {
            const namespace = 'default';
            const deployments = await this.k8sClient.apis.apps.v1.namespaces(namespace).deployments.get();
            const k8sServices = await this.k8sClient.api.v1.namespaces(namespace).services.get();

            const servicesMap = new Map<string, Service>();

            deployments.body.items.forEach(deployment => {
                const container = deployment.spec.template.spec.containers[0];
                const envVars = container.env?.map(env => `${env.name}=${env.value}`) || [];
                const serviceName = deployment.metadata.name;

                const k8sService = k8sServices.body.items.find(s => s.metadata.name === serviceName);
                if (k8sService) {
                    servicesMap.set(serviceName, new Service(
                        deployment.metadata.uid,
                        serviceName,
                        container.image,
                        k8sService.spec.ports[0].port,
                        container.ports[0].containerPort,
                        k8sService.spec.type === 'LoadBalancer',
                        envVars,
                        deployment.spec.replicas,
                        container.resources?.limits?.cpu,
                        container.resources?.limits?.memory,
                        deployment.metadata.namespace,
                        container.livenessProbe?.httpGet?.path
                    ));
                }
            });

            return Array.from(servicesMap.values());
        } catch (error) {
            throw new Error(`Failed to list services: ${error.message}`);
        }
    }

    async deleteService(id: string): Promise<void> {
        try {
            const namespace = 'default';
            await this.k8sClient.apis.apps.v1.namespaces(namespace).deployments(id).delete();
            await this.k8sClient.api.v1.namespaces(namespace).services(id).delete();
        } catch (error) {
            throw new Error(`Failed to delete service ${id}: ${error.message}`);
        }
    }

    async checkServiceHealth(id: string): Promise<{ status: string; details?: any }> {
        try {
            const namespace = 'default';
            const podList = await this.k8sClient.api.v1.namespaces(namespace).pods.get({
                qs: { labelSelector: `app=${id}` }
            });

            if (!podList.body.items.length) {
                return { status: 'unhealthy', details: { reason: 'No pods found' } };
            }

            const pod = podList.body.items[0];
            const containerStatuses = pod.status.containerStatuses || [];

            if (containerStatuses.some(cs => cs.ready)) {
                return { status: 'healthy' };
            }

            return {
                status: 'unhealthy',
                details: {
                    reason: 'Containers not ready',
                    containerStatuses
                }
            };
        } catch (error) {
            return { status: 'unhealthy', details: { error: error.message } };
        }
    }
}