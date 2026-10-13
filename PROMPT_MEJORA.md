# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `Dockerfile` — El topic pide contenedores/orquestacion: este archivo es el ejercicio, no scaffolding.
- `docker-compose.yml` — El topic pide contenedores/orquestacion: este archivo es el ejercicio, no scaffolding.
- `k8s/deployments/service-deployment.yaml` — El topic pide contenedores/orquestacion: este archivo es el ejercicio, no scaffolding.
- `k8s/services/service-clusterip.yaml` — El topic pide contenedores/orquestacion: este archivo es el ejercicio, no scaffolding.
- `k8s/ingress/service-ingress.yaml` — El topic pide contenedores/orquestacion: este archivo es el ejercicio, no scaffolding.
- `k8s/configmaps/service-configmap.yaml` — El topic pide contenedores/orquestacion: este archivo es el ejercicio, no scaffolding.
- `k8s/secrets/service-secrets.yaml` — El topic pide contenedores/orquestacion: este archivo es el ejercicio, no scaffolding.
- `k8s/hpa/service-hpa.yaml` — El topic pide contenedores/orquestacion: este archivo es el ejercicio, no scaffolding.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `package.json` — `kubernetes-client@0.20.0`: kubernetes-client declara la version 0.20.0, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.
- `package.json` — `typescript@5.7.0`: typescript declara la version 5.7.0, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Senior

### Brecha de conocimiento
Implementa la contenerización y orquestación de contenedores en proyectos, teniendo en cuenta las diferencias, ventajas y desventajas de cada enfoque. Utiliza al menos dos herramientas de contenerización/orquestación, como Docker, Docker Compose, Docker Swarm, K8s (Kubernetes) u OpenShift.

### Misión / candidato
Candidato Senior con experiencia en backend, trabajando en entornos de producción.

### Reto
- Tema: implementa-plataformas-de-contenedores-enfocados-en-docker-y-kubernetes
- Seniority: senior-l2
- Tipo: practical
- Título: Diseño de plataforma de contenedores para entorno de producción
- Tiempo estimado: 40 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Evaluación de herramientas de contenerización y orquestación — objetivo: Identificar y evaluar las herramientas de contenerización y orquestación más adecuadas para el entorno de producción. — entregable (NO resolver): Reporte de evaluación de herramientas de contenerización y orquestación.
- Fase 2: Implementación de la plataforma de contenedores — objetivo: Implementar la plataforma de contenedores utilizando la combinación de herramientas elegida en la fase anterior. — entregable (NO resolver): Plataforma de contenedores implementada y configurada con Docker y Kubernetes.
- Fase 3: Validación y optimización de la plataforma de contenedores — objetivo: Validar y optimizar la plataforma de contenedores para asegurar su robustez y eficiencia en un entorno de producción. — entregable (NO resolver): Plataforma de contenedores validada y optimizada para entorno de producción.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "container-platform-service",
  "version": "1.0.0",
  "description": "Plataforma de contenedores para orquestación de servicios en producción usando Docker y Kubernetes",
  "main": "dist/main.js",
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "ts-node src/main.ts",
    "start:dev": "nest start --debug --watch",
    "start:prod": "node dist/main.js",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "docker:build": "docker build -t container-platform-service .",
    "docker:run": "docker run -p 3000:3000 container-platform-service",
    "k8s:apply": "kubectl apply -f k8s/",
    "k8s:delete": "kubectl delete -f k8s/",
    "healthcheck": "./scripts/healthcheck.sh"
  },
  "dependencies": {
    "@nestjs/common": "^11.0.0",
    "@nestjs/core": "^11.0.0",
    "@nestjs/platform-express": "^11.0.0",
    "reflect-metadata": "^0.2.0",
    "rxjs": "^7.8.0",
    "@nestjs/swagger": "^7.1.0",
    "class-validator": "^0.14.0",
    "class-transformer": "^0.5.1",
    "kubernetes-client": "^0.20.0",
    "dockerode": "^4.0.0"
  },
  "devDependencies": {
    "typescript": "^5.7.0",
    "@nestjs/testing": "^11.0.0",
    "@types/node": "^20.0.0",
    "@types/jest": "^29.5.0",
    "@types/express": "^4.17.17",
    "jest": "^29.5.0",
    "ts-jest": "^29.1.0",
    "ts-node": "^10.9.1",
    "eslint": "^8.40.0",
    "eslint-config-prettier": "^8.8.0",
    "eslint-plugin-prettier": "^4.2.1",
    "prettier": "^2.8.8",
    "@typescript-eslint/eslint-plugin": "^5.59.0",
    "@typescript-eslint/parser": "^5.59.0",
    "supertest": "^6.3.3"
  },
  "jest": {
    "moduleFileExtensions": ["js", "json", "ts"],
    "rootDir": "src",
    "testRegex": ".spec.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": ["**/*.(t|j)s"],
    "coverageDirectory": "../coverage"
  }
}

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2022",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "strictBindCallApply": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "strict": true
  },
  "include": ["src/**/*", "test/**/*"],
  "exclude": ["node_modules", "dist", "coverage"]
}

// === ARCHIVO: src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de validación global
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Container Platform Service')
    .setDescription('API para gestión de contenedores y orquestación en Kubernetes')
    .setVersion('1.0')
    .addTag('container-platform')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Carga de configuración de Kubernetes desde ConfigMap
  const kubeConfig = JSON.parse(
    readFileSync(join(__dirname, '../../k8s/configmaps/service-configmap.yaml'), 'utf8'),
  );

  await app.listen(kubeConfig.data.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch((err) => {
  console.error('Failed to start application:', err);
  process.exit(1);
});


// === ARCHIVO: src/domain/entities/service.entity.ts ===

import { IsString, IsInt, IsBoolean, IsOptional, IsArray } from 'class-validator';

/**
 * Entidad de dominio que representa un servicio desplegado en la plataforma de contenedores.
 * Contiene la configuración necesaria para la orquestación en Kubernetes y Docker.
 */
export class Service {
    @IsString()
    readonly id: string;

    @IsString()
    readonly name: string;

    @IsString()
    readonly image: string;

    @IsInt()
    readonly port: number;

    @IsInt()
    readonly targetPort: number;

    @IsInt()
    @IsOptional()
    readonly replicas?: number;

    @IsBoolean()
    readonly isPublic: boolean;

    @IsArray()
    @IsString({ each: true })
    readonly environmentVariables: string[];

    @IsString()
    @IsOptional()
    readonly cpuLimit?: string;

    @IsString()
    @IsOptional()
    readonly memoryLimit?: string;

    @IsString()
    @IsOptional()
    readonly namespace?: string;

    @IsString()
    @IsOptional()
    readonly healthCheckPath?: string;

    constructor(
        id: string,
        name: string,
        image: string,
        port: number,
        targetPort: number,
        isPublic: boolean,
        environmentVariables: string[] = [],
        replicas?: number,
        cpuLimit?: string,
        memoryLimit?: string,
        namespace?: string,
        healthCheckPath?: string
    ) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.port = port;
        this.targetPort = targetPort;
        this.replicas = replicas;
        this.isPublic = isPublic;
        this.environmentVariables = environmentVariables;
        this.cpuLimit = cpuLimit;
        this.memoryLimit = memoryLimit;
        this.namespace = namespace;
        this.healthCheckPath = healthCheckPath;
    }
}

// === ARCHIVO: src/domain/ports/service.repository.port.ts ===

import { Service } from '../entities/service.entity';

/**
 * Puerto que define las operaciones de persistencia para la entidad Service.
 * Este contrato es implementado por la capa de infraestructura.
 */
export interface ServiceRepositoryPort {
    /**
     * Crea o actualiza un servicio en el cluster de Kubernetes.
     * @param service El servicio a desplegar
     * @returns Promise con el servicio desplegado
     */
    deployService(service: Service): Promise<Service>;

    /**
     * Obtiene un servicio por su identificador.
     * @param id Identificador del servicio
     * @returns Promise con el servicio encontrado o null si no existe
     */
    getServiceById(id: string): Promise<Service | null>;

    /**
     * Lista todos los servicios desplegados en el cluster.
     * @returns Promise con la lista de servicios
     */
    listServices(): Promise<Service[]>;

    /**
     * Elimina un servicio del cluster.
     * @param id Identificador del servicio a eliminar
     * @returns Promise que se resuelve cuando el servicio es eliminado
     */
    deleteService(id: string): Promise<void>;

    /**
     * Verifica el estado de salud de un servicio.
     * @param id Identificador del servicio
     * @returns Promise con el estado de salud del servicio
     */
    checkServiceHealth(id: string): Promise<{ status: string; details?: any }>;
}

// === ARCHIVO: src/infrastructure/repositories/kubernetes.service.repository.ts ===

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

// === ARCHIVO: src/app.module.ts ===
import { Module } from '@nestjs/common';
import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { DeployUseCase } from './application/use-cases/deploy.service';
import { ServiceRepositoryPort } from './domain/ports/service.repository.port';
import { KubernetesServiceRepository } from './infrastructure/repositories/kubernetes.service.repository';
import { Service } from './domain/entities/service.entity';
import { IsString, IsNumber, IsBoolean, IsOptional, IsArray, Min, Max, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@Module({
  controllers: [ServiceController],
  providers: [
    DeployUseCase,
    {
      provide: ServiceRepositoryPort,
      useClass: KubernetesServiceRepository,
    },
  ],
  exports: [ServiceRepositoryPort, DeployUseCase],
})
export class AppModule {}

class CreateServiceDto {
  @IsString()
  name!: string;

  @IsString()
  image!: string;

  @IsNumber()
  @Min(1)
  @Max(65535)
  port!: number;

  @IsNumber()
  @Min(1)
  @Max(65535)
  targetPort!: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  replicas?: number;

  @IsBoolean()
  isPublic!: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  environmentVariables?: string[];

  @IsOptional()
  @IsString()
  cpuLimit?: string;

  @IsOptional()
  @IsString()
  memoryLimit?: string;

  @IsOptional()
  @IsString()
  namespace?: string;

  @IsOptional()
  @IsString()
  healthCheckPath?: string;
}

class ServiceResponseDto {
  id!: string;
  name!: string;
  image!: string;
  port!: number;
  targetPort!: number;
  replicas?: number;
  isPublic!: boolean;
  environmentVariables!: string[];
  cpuLimit?: string;
  memoryLimit?: string;
  namespace?: string;
  healthCheckPath?: string;

  static fromEntity(service: Service): ServiceResponseDto {
    const dto = new ServiceResponseDto();
    dto.id = service.id;
    dto.name = service.name;
    dto.image = service.image;
    dto.port = service.port;
    dto.targetPort = service.targetPort;
    dto.replicas = service.replicas;
    dto.isPublic = service.isPublic;
    dto.environmentVariables = service.environmentVariables;
    dto.cpuLimit = service.cpuLimit;
    dto.memoryLimit = service.memoryLimit;
    dto.namespace = service.namespace;
    dto.healthCheckPath = service.healthCheckPath;
    return dto;
  }
}

@Controller('api/services')
class ServiceController {
  constructor(private readonly deployUseCase: DeployUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async deployService(@Body() createServiceDto: CreateServiceDto): Promise<ServiceResponseDto> {
    const service = new Service(
      createServiceDto.name,
      createServiceDto.image,
      createServiceDto.port,
      createServiceDto.targetPort,
      createServiceDto.replicas ?? 1,
      createServiceDto.isPublic,
      createServiceDto.environmentVariables ?? [],
      createServiceDto.cpuLimit,
      createServiceDto.memoryLimit,
      createServiceDto.namespace ?? 'default',
      createServiceDto.healthCheckPath,
    );
    const deployed = await this.deployUseCase.deployService(service);
    return ServiceResponseDto.fromEntity(deployed);
  }

  @Get(':id')
  async getService(@Param('id') id: string): Promise<ServiceResponseDto | null> {
    const service = await this.deployUseCase.getServiceById(id);
    if (!service) {
      return null;
    }
    return ServiceResponseDto.fromEntity(service);
  }

  @Get()
  async listServices(): Promise<ServiceResponseDto[]> {
    const services = await this.deployUseCase.listServices();
    return services.map(ServiceResponseDto.fromEntity);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteService(@Param('id') id: string): Promise<void> {
    await this.deployUseCase.deleteService(id);
  }
}

// === ARCHIVO: src/application/use-cases/deploy.service.ts ===
import { Injectable, Inject, Logger, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ServiceRepositoryPort } from '../../domain/ports/service.repository.port';
import { Service } from '../../domain/entities/service.entity';

@Injectable()
export class DeployUseCase {
  private readonly logger = new Logger(DeployUseCase.name);

  constructor(
    @Inject(ServiceRepositoryPort)
    private readonly serviceRepository: ServiceRepositoryPort,
  ) {}

  async deployService(service: Service): Promise<Service> {
    if (!service.name || service.name.trim().length === 0) {
      this.logger.error('Service name cannot be empty');
      throw new BadRequestException('El nombre del servicio no puede estar vacío');
    }

    if (!service.image || service.image.trim().length === 0) {
      this.logger.error('Service image cannot be empty');
      throw new BadRequestException('La imagen del servicio no puede estar vacía');
    }

    if (service.port < 1 || service.port > 65535) {
      this.logger.error(`Invalid port: ${service.port}`);
      throw new BadRequestException('El puerto debe estar entre 1 y 65535');
    }

    if (service.targetPort < 1 || service.targetPort > 65535) {
      this.logger.error(`Invalid target port: ${service.targetPort}`);
      throw new BadRequestException('El puerto objetivo debe estar entre 1 y 65535');
    }

    if (service.replicas !== undefined && (service.replicas < 1 || service.replicas > 100)) {
      this.logger.error(`Invalid replicas: ${service.replicas}`);
      throw new BadRequestException('Las réplicas deben estar entre 1 y 100');
    }

    try {
      this.logger.log(`Deploying service: ${service.name} with image ${service.image}`);
      const deployed = await this.serviceRepository.deployService(service);
      this.logger.log(`Service ${service.name} deployed successfully with ID: ${deployed.id}`);
      return deployed;
    } catch (error) {
      this.logger.error(`Failed to deploy service ${service.name}: ${error}`);
      throw new InternalServerErrorException('Error al desplegar el servicio en Kubernetes');
    }
  }

  async getServiceById(id: string): Promise<Service | null> {
    if (!id || id.trim().length === 0) {
      this.logger.error('Service ID cannot be empty');
      throw new BadRequestException('El ID del servicio no puede estar vacío');
    }

    try {
      this.logger.log(`Fetching service with ID: ${id}`);
      const service = await this.serviceRepository.getServiceById(id);
      if (!service) {
        this.logger.warn(`Service not found: ${id}`);
        return null;
      }
      this.logger.log(`Service ${id} retrieved successfully`);
      return service;
    } catch (error) {
      this.logger.error(`Failed to fetch service ${id}: ${error}`);
      throw new InternalServerErrorException('Error al obtener el servicio');
    }
  }

  async listServices(): Promise<Service[]> {
    try {
      this.logger.log('Listing all services');
      const services = await this.serviceRepository.listServices();
      this.logger.log(`Found ${services.length} services`);
      return services;
    } catch (error) {
      this.logger.error(`Failed to list services: ${error}`);
      throw new InternalServerErrorException('Error al listar los servicios');
    }
  }

  async deleteService(id: string): Promise<void> {
    if (!id || id.trim().length === 0) {
      this.logger.error('Service ID cannot be empty');
      throw new BadRequestException('El ID del servicio no puede estar vacío');
    }

    try {
      this.logger.log(`Deleting service with ID: ${id}`);
      const service = await this.serviceRepository.getServiceById(id);
      if (!service) {
        this.logger.warn(`Service not found for deletion: ${id}`);
        throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
      }
      await this.serviceRepository.deleteService(id);
      this.logger.log(`Service ${id} deleted successfully`);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to delete service ${id}: ${error}`);
      throw new InternalServerErrorException('Error al eliminar el servicio');
    }
  }

  async checkServiceHealth(id: string): Promise<boolean> {
    if (!id || id.trim().length === 0) {
      this.logger.error('Service ID cannot be empty');
      throw new BadRequestException('El ID del servicio no puede estar vacío');
    }

    try {
      this.logger.log(`Checking health for service: ${id}`);
      const isHealthy = await this.serviceRepository.checkServiceHealth(id);
      this.logger.log(`Service ${id} health status: ${isHealthy}`);
      return isHealthy;
    } catch (error) {
      this.logger.error(`Failed to check health for service ${id}: ${error}`);
      return false;
    }
  }
}

// === ARCHIVO: src/infrastructure/controllers/service.controller.ts ===
import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, Put, Patch, Query, Headers, UseGuards } from '@nestjs/common';
import { DeployUseCase } from '../../application/use-cases/deploy.service';
import { Service } from '../../domain/entities/service.entity';
import { IsString, IsNumber, IsBoolean, IsOptional, IsArray, Min, Max, IsUUID, IsNotEmpty } from 'class-validator';
import { Type, Transform } from 'class-transformer';

class ScaleServiceDto {
  @IsNumber()
  @Min(1)
  @Max(100)
  replicas!: number;
}

class UpdateServiceDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  image?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(65535)
  port?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(65535)
  targetPort?: number;

  @IsOptional()
  @IsString()
  cpuLimit?: string;

  @IsOptional()
  @IsString()
  memoryLimit?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  environmentVariables?: string[];
}

class ServiceListQueryDto {
  @IsOptional()
  @IsString()
  namespace?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  includeHealth?: boolean;
}

@Controller('api/v1/services')
export class ServiceController {
  private readonly logger = new (require('../../common/logger').Logger)(ServiceController.name);

  constructor(private readonly deployUseCase: DeployUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createService(@Body() dto: CreateServiceDto): Promise<ServiceResponse> {
    this.logger.log(`Creating service: ${dto.name}`);
    
    const service = new Service(
      dto.name,
      dto.image,
      dto.port,
      dto.targetPort,
      dto.replicas ?? 1,
      dto.isPublic,
      dto.environmentVariables ?? [],
      dto.cpuLimit,
      dto.memoryLimit,
      dto.namespace ?? 'default',
      dto.healthCheckPath,
    );

    const created = await this.deployUseCase.deployService(service);
    this.logger.log(`Service created with ID: ${created.id}`);
    
    return ServiceResponse.fromEntity(created);
  }

  @Get('health/:id')
  async checkHealth(@Param('id') id: string): Promise<{ healthy: boolean; serviceId: string }> {
    this.logger.log(`Checking health for service: ${id}`);
    const healthy = await this.deployUseCase.checkServiceHealth(id);
    return { healthy, serviceId: id };
  }

  @Get(':id')
  async getService(@Param('id') id: string): Promise<ServiceResponse | null> {
    this.logger.log(`Fetching service: ${id}`);
    const service = await this.deployUseCase.getServiceById(id);
    if (!service) {
      return null;
    }
    return ServiceResponse.fromEntity(service);
  }

  @Get()
  async listServices(@Query() query: ServiceListQueryDto): Promise<ServiceResponse[]> {
    this.logger.log(`Listing services, namespace filter: ${query.namespace ?? 'all'}`);
    const services = await this.deployUseCase.listServices();
    return services.map(ServiceResponse.fromEntity);
  }

  @Put(':id')
  async updateService(
    @Param('id') id: string,
    @Body() dto: UpdateServiceDto,
  ): Promise<ServiceResponse> {
    this.logger.log(`Updating service: ${id}`);
    const existing = await this.deployUseCase.getServiceById(id);
    if (!existing) {
      throw new (require('@nestjs/common').NotFoundException)(`Service ${id} not found`);
    }
    
    const updated = new Service(
      existing.name,
      dto.image ?? existing.image,
      dto.port ?? existing.port,
      dto.targetPort ?? existing.targetPort,
      existing.replicas,
      existing.isPublic,
      dto.environmentVariables ?? existing.environmentVariables,
      dto.cpuLimit ?? existing.cpuLimit,
      dto.memoryLimit ?? existing.memoryLimit,
      existing.namespace,
      existing.healthCheckPath,
    );
    
    const deployed = await this.deployUseCase.deployService(updated);
    this.logger.log(`Service ${id} updated successfully`);
    return ServiceResponse.fromEntity(deployed);
  }

  @Patch(':id/scale')
  async scaleService(
    @Param('id') id: string,
    @Body() dto: ScaleServiceDto,
  ): Promise<{ serviceId: string; replicas: number }> {
    this.logger.log(`Scaling service ${id} to ${dto.replicas} replicas`);
    const existing = await this.deployUseCase.getServiceById(id);
    if (!existing) {
      throw new (require('@nestjs/common').NotFoundException)(`Service ${id} not found`);
    }
    
    const scaled = new Service(
      existing.name,
      existing.image,
      existing.port,
      existing.targetPort,
      dto.replicas,
      existing.isPublic,
      existing.environmentVariables,
      existing.cpuLimit,
      existing.memoryLimit,
      existing.namespace,
      existing.healthCheckPath,
    );
    
    await this.deployUseCase.deployService(scaled);
    this.logger.log(`Service ${id} scaled to ${dto.replicas} replicas`);
    return { serviceId: id, replicas: dto.replicas };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteService(@Param('id') id: string): Promise<void> {
    this.logger.log(`Deleting service: ${id}`);
    await this.deployUseCase.deleteService(id);
    this.logger.log(`Service ${id} deleted successfully`);
  }
}

class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  image!: string;

  @IsNumber()
  @Min(1)
  @Max(65535)
  port!: number;

  @IsNumber()
  @Min(1)
  @Max(65535)
  targetPort!: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  replicas?: number;

  @IsBoolean()
  isPublic!: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  environmentVariables?: string[];

  @IsOptional()
  @IsString()
  cpuLimit?: string;

  @IsOptional()
  @IsString()
  memoryLimit?: string;

  @IsOptional()
  @IsString()
  namespace?: string;

  @IsOptional()
  @IsString()
  healthCheckPath?: string;
}

class ServiceResponse {
  id!: string;
  name!: string;
  image!: string;
  port!: number;
  targetPort!: number;
  replicas?: number;
  isPublic!: boolean;
  environmentVariables!: string[];
  cpuLimit?: string;
  memoryLimit?: string;
  namespace?: string;
  healthCheckPath?: string;

  static fromEntity(service: Service): ServiceResponse {
    const response = new ServiceResponse();
    response.id = service.id;
    response.name = service.name;
    response.image = service.image;
    response.port = service.port;
    response.targetPort = service.targetPort;
    response.replicas = service.replicas;
    response.isPublic = service.isPublic;
    response.environmentVariables = service.environmentVariables;
    response.cpuLimit = service.cpuLimit;
    response.memoryLimit = service.memoryLimit;
    response.namespace = service.namespace;
    response.healthCheckPath = service.healthCheckPath;
    return response;
  }
}


// === ARCHIVO: Dockerfile ===
# Stage 1: Build stage - compila la aplicación TypeScript/NestJS
FROM node:22-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de package para instalar dependencias
COPY package*.json ./

# Instalar dependencias de producción y desarrollo
RUN npm ci --only=production && npm ci

# Copiar todo el código fuente
COPY . .

# Compilar TypeScript
RUN npm run build

# Stage 2: Production stage - imagen final optimizada
FROM node:22-alpine AS production

# Crear usuario no root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de package para instalar solo dependencias de producción
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production

# Copiar los archivos compilados del stage de construcción
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Copiar archivos de configuración de Kubernetes
COPY k8s/ ./k8s/

# Cambiar ownership de archivos al usuario no root
RUN chown -R nodejs:nodejs /app

# Cambiar al usuario no root
USER nodejs

# Exponer puerto de la aplicación
EXPOSE 3000

# Variable de entorno para modo producción
ENV NODE_ENV=production

# Comando de inicio de la aplicación
CMD ["node", "dist/main.js"]

// === ARCHIVO: .dockerignore ===
# Node.js
node_modules
npm-debug.log
yarn-error.log
yarn.lock
package-lock.json

# TypeScript compiled output
dist
build
out

# Test coverage
coverage
.nyc_output

# IDE and editor
.idea
.vscode
*.swp
*.swo
*~

# OS files
.DS_Store
Thumbs.db

# Git
.git
.gitignore

# Documentation
*.md
!README.md
docs/

# Kubernetes manifests - se copian manualmente si son necesarios
# k8s/

# Scripts
scripts/

# Test files
test/
__tests__/
*.spec.ts
*.test.ts
*.e2e.ts

# Configuration files that should not be in image
.env
.env.local
.env.*.local

# Temporary files
tmp/
temp/
*.tmp
*.temp

// === ARCHIVO: docker-compose.yml ===
version: '3.9'

services:
  # Servicio principal de la plataforma de contenedores
  container-platform-service:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: container-platform-service
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - KUBERNETES_HOST=http://host.docker.internal
      - KUBERNETES_PORT=6443
      - DOCKER_HOST=unix:///var/run/docker.sock
    volumes:
      - ./k8s:/app/k8s:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
    networks:
      - container-platform-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy

  # Base de datos PostgreSQL para persistencia
  postgres:
    image: postgres:16-alpine
    container_name: container-platform-db
    environment:
      - POSTGRES_USER=cpuser
      - POSTGRES_PASSWORD=cppassword
      - POSTGRES_DB=container_platform
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - container-platform-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U cpuser -d container_platform"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis para caché y sesiones
  redis:
    image: redis:7-alpine
    container_name: container-platform-cache
    ports:
      - "6379:6379"
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    networks:
      - container-platform-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Minikube para desarrollo local de Kubernetes
  minikube:
    image: minikube:latest
    container_name: container-platform-minikube
    privileged: true
    volumes:
      - minikube_cache:/minikube/cache
    networks:
      - container-platform-network
    environment:
      - MINIKUBE_DRIVER=docker
      - MINIKUBE_MEMORY=4096
      - MINIKUBE_CPUS=2
    command: >
      start
      --driver=docker
      --memory=4096
      --cpus=2
      --kubernetes-version=v1.28.0
      --addons=ingress,dashboard,metrics-server
    restart: on-failure:10

networks:
  container-platform-network:
    driver: bridge
    name: container-platform-net

volumes:
  postgres_data:
    name: container-platform-postgres
  redis_data:
    name: container-platform-redis
  minikube_cache:
    name: container-platform-minikube-cache


// === ARCHIVO: README.md ===
# Container Platform Service

Plataforma de contenedores para orquestación de servicios en producción usando Docker y Kubernetes.

## Requisitos Previos

- Node.js 22.x
- npm 10.x
- Docker 24.x o superior
- Kubernetes (Minikube, Kind, o un cluster real)
- kubectl configurado

## Instalación

```bash
npm install
```

## Compilación

```bash
npm run build
```

## Ejecución en Desarrollo

```bash
npm run start:dev
```

El servicio estará disponible en http://localhost:3000

## Ejecución en Producción

### Usando Node.js

```bash
npm run start:prod
```

### Usando Docker

```bash
npm run docker:build
npm run docker:run
```

## Configuración de Kubernetes

Los manifiestos de Kubernetes se encuentran en el directorio `k8s/`:

- `k8s/deployments/service-deployment.yaml` - Despliegue del servicio
- `k8s/services/service-clusterip.yaml` - Servicio de tipo ClusterIP
- `k8s/ingress/service-ingress.yaml` - Configuración de Ingress
- `k8s/configmaps/service-configmap.yaml` - ConfigMap para variables de entorno
- `k8s/secrets/service-secrets.yaml` - Secrets para datos sensibles
- `k8s/hpa/service-hpa.yaml` - Horizontal Pod Autoscaler

### Aplicar recursos a Kubernetes

```bash
npm run k8s:apply
```

### Eliminar recursos de Kubernetes

```bash
npm run k8s:delete
```

## Health Check

```bash
npm run healthcheck
```

## Pruebas

```bash
npm test
```

### Con coverage

```bash
npm run test:cov
```

### Modo watch

```bash
npm run test:watch
```

## API Documentation

Una vez iniciado el servicio, la documentación Swagger está disponible en:

```
http://localhost:3000/api
```

## Estructura del Proyecto

```
src/
├── main.ts                      # Punto de entrada de la aplicación
├── app.module.ts                # Módulo raíz de NestJS
├── domain/
│   ├── entities/
│   │   └── service.entity.ts    # Entidad del dominio
│   └── ports/
│       └── service.repository.port.ts  # Puerto del repositorio
├── application/
│   └── use-cases/
│       └── deploy.service.ts    # Caso de uso de despliegue
└── infrastructure/
    ├── controllers/
    │   └── service.controller.ts # Controlador REST
    └── repositories/
        └── kubernetes.service.repository.ts # Adaptador de Kubernetes
```

## Variables de Entorno

El servicio utiliza las siguientes variables de entorno configuradas en el ConfigMap de Kubernetes:

- `PORT` - Puerto donde corre el servicio (default: 3000)
- `NODE_ENV` - Entorno de ejecución (development, production)
- `KUBERNETES_NAMESPACE` - Namespace de Kubernetes

## Tecnologías Utilizadas

- **NestJS 11** - Framework de Node.js
- **TypeScript 5.7** - Lenguaje de programación
- **Docker** - Plataforma de contenedores
- **Kubernetes** - Orquestación de contenedores
- **kubernetes-client** - Cliente de Kubernetes para Node.js
- **dockerode** - Cliente de Docker para Node.js

## Referencias Externas

- [NestJS Documentation](https://docs.nestjs.com)
- [Kubernetes Official Documentation](https://kubernetes.io/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Client for Node.js](https://github.com/kubernetes-client/javascript)
- [Dockerode GitHub](https://github.com/apocas/dockerode)


// === ARCHIVO: k8s/deployments/service-deployment.yaml ===
apiVersion: apps/v1
kind: Deployment
metadata:
  name: container-platform-service
  namespace: default
  labels:
    app: container-platform-service
    version: v1
spec:
  replicas: 3
  selector:
    matchLabels:
      app: container-platform-service
  template:
    metadata:
      labels:
        app: container-platform-service
        version: v1
    spec:
      containers:
        - name: container-platform-service
          image: container-platform-service:latest
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 3000
              protocol: TCP
          env:
            - name: NODE_ENV
              value: "production"
            - name: PORT
              valueFrom:
                configMapKeyRef:
                  name: service-configmap
                  key: PORT
          resources:
            requests:
              memory: "256Mi"
              cpu: "250m"
            limits:
              memory: "512Mi"
              cpu: "500m"
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 10
            timeoutSeconds: 5
            failureThreshold: 3
          readinessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 10
            periodSeconds: 5
            timeoutSeconds: 3
            failureThreshold: 3
      restartPolicy: Always
---
// === ARCHIVO: k8s/services/service-clusterip.yaml ===
apiVersion: v1
kind: Service
metadata:
  name: container-platform-service
  namespace: default
  labels:
    app: container-platform-service
spec:
  type: ClusterIP
  selector:
    app: container-platform-service
  ports:
    - name: http
      protocol: TCP
      port: 80
      targetPort: 3000
  sessionAffinity: None
---
// === ARCHIVO: k8s/ingress/service-ingress.yaml ===
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: container-platform-service
  namespace: default
  labels:
    app: container-platform-service
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "false"
spec:
  ingressClassName: nginx
  rules:
    - host: container-platform.local
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: container-platform-service
                port:
                  number: 80


// === ARCHIVO: k8s/configmaps/service-configmap.yaml ===
apiVersion: v1
kind: ConfigMap
metadata:
  name: service-config
  namespace: default
  labels:
    app: container-platform-service
    component: configuration
data:
  # Configuración del servicio
  PORT: "3000"
  NODE_ENV: "production"
  
  # Configuración de la API
  API_TITLE: "Container Platform Service"
  API_DESCRIPTION: "API para gestión de contenedores y orquestación en Kubernetes"
  API_VERSION: "1.0"
  
  # Configuración de health checks
  HEALTH_CHECK_PATH: "/health"
  HEALTH_CHECK_INTERVAL: "30"
  
  # Configuración de logging
  LOG_LEVEL: "info"
  LOG_FORMAT: "json"
  
  # Configuración de Kubernetes
  KUBERNETES_NAMESPACE: "default"
  KUBERNETES_DEPLOYMENT_NAME: "container-platform-service"
  
  # Configuración de límites de recursos
  DEFAULT_CPU_LIMIT: "500m"
  DEFAULT_MEMORY_LIMIT: "512Mi"
  DEFAULT_CPU_REQUEST: "200m"
  DEFAULT_MEMORY_REQUEST: "256Mi"

---

// === ARCHIVO: k8s/secrets/service-secrets.yaml ===
apiVersion: v1
kind: Secret
metadata:
  name: service-secrets
  namespace: default
  labels:
    app: container-platform-service
    component: secrets
type: Opaque
data:
  # Credenciales de base de datos (Base64 encoded)
  # TODO: Reemplazar con valores reales codificados en Base64
  DATABASE_USERNAME: cGxhdGZvcm0tdXNlcg==
  DATABASE_PASSWORD: cGxhY2Vob2xkZXItcGFzc3dvcmQ=
  
  # Tokens de API
  # TODO: Generar tokens seguros y codificarlos
  API_TOKEN: YXBpLXRva2VuLXBsYWNlaG9sZGVy
  JWT_SECRET: anRtLXNlY3JldC1wbGFjZWhvbGRlcg==
  
  # Credenciales de Docker Registry
  # TODO: Configurar con credenciales reales
  DOCKER_REGISTRY_USERNAME: cmVnaXN0cnktdXNlcg==
  DOCKER_REGISTRY_PASSWORD: cmVnaXN0cnktcGFzc3dvcmQ=
  DOCKER_REGISTRY_URL: aHR0cHM6Ly9yZWdpc3RyeS5leGFtcGxlLmNvbQ==

---

// === ARCHIVO: k8s/hpa/service-hpa.yaml ===
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: container-platform-service-hpa
  namespace: default
  labels:
    app: container-platform-service
    component: autoscaling
spec:
  # Referencia al deployment que será escalado
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: container-platform-service
  
  # Configuración de escalamiento
  minReplicas: 2
  maxReplicas: 10
  
  # Métricas para el escalamiento automático
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          # Escalar cuando el uso de CPU supere el 70%
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          # Escalar cuando el uso de memoria supere el 80%
          averageUtilization: 80
  
  # Comportamiento del escalamiento
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Percent
          value: 10
          periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
        - type: Percent
          value: 100
          periodSeconds: 15
        - type: Pods
          value: 4
          periodSeconds: 15
      selectPolicy: Max


// === ARCHIVO: scripts/healthcheck.sh ===
#!/bin/bash

set -euo pipefail

SERVICES_URL="${SERVICES_URL:-http://localhost:3000}"
HEALTH_ENDPOINT="${HEALTH_ENDPOINT:-/api/health}"
MAX_RETRIES="${MAX_RETRIES:-5}"
RETRY_INTERVAL="${RETRY_INTERVAL:-5}"
TIMEOUT="${TIMEOUT:-5}"

echo "=========================================="
echo "  Container Platform Service Healthcheck"
echo "=========================================="
echo "Target URL: ${SERVICES_URL}${HEALTH_ENDPOINT}"
echo "Max Retries: ${MAX_RETRIES}"
echo "Retry Interval: ${RETRY_INTERVAL}s"
echo "Timeout: ${TIMEOUT}s"
echo "=========================================="

check_health() {
    local url="$1"
    local timeout="$2"
    
    response=$(curl -sf \
        --max-time "$timeout" \
        -w "\n%{http_code}" \
        -o /dev/null \
        "$url" 2>/dev/null) || return 1
    
    http_code=$(echo "$response" | tail -n1)
    
    if [ "$http_code" = "200" ]; then
        return 0
    else
        echo "[WARN] Health check returned HTTP $http_code"
        return 1
    fi
}

check_service_dependencies() {
    echo "[INFO] Checking service dependencies..."
    
    if command -v curl &> /dev/null; then
        echo "[OK] curl is available"
    else
        echo "[ERROR] curl is not installed"
        return 1
    fi
    
    if command -v jq &> /dev/null; then
        echo "[OK] jq is available"
    else
        echo "[WARN] jq is not installed - some checks may be limited"
    fi
    
    return 0
}

check_docker_service() {
    echo "[INFO] Checking Docker service availability..."
    
    if docker info &> /dev/null; then
        echo "[OK] Docker daemon is accessible"
        return 0
    else
        echo "[WARN] Docker daemon is not accessible (may be expected in Kubernetes)"
        return 0
    fi
}

check_kubernetes_context() {
    echo "[INFO] Checking Kubernetes context..."
    
    if command -v kubectl &> /dev/null && kubectl cluster-info &> /dev/null; then
        echo "[OK] Kubernetes cluster is accessible"
        return 0
    else
        echo "[WARN] Kubernetes cluster is not accessible (may be expected locally)"
        return 0
    fi
}

log_success() {
    echo "[SUCCESS] Service is healthy and responding"
    echo "=========================================="
    exit 0
}

log_failure() {
    echo "[FAILURE] Service health check failed after ${MAX_RETRIES} attempts"
    echo "[FAILURE] URL: ${SERVICES_URL}${HEALTH_ENDPOINT}"
    echo "=========================================="
    exit 1
}

main() {
    local attempt=1
    local full_url="${SERVICES_URL}${HEALTH_ENDPOINT}"
    
    echo "[INFO] Starting health check for Container Platform Service"
    echo "[INFO] Full health check URL: $full_url"
    
    if ! check_service_dependencies; then
        echo "[ERROR] Service dependencies check failed"
        exit 1
    fi
    
    check_docker_service || true
    check_kubernetes_context || true
    
    echo "[INFO] Beginning health check loop..."
    
    while [ $attempt -le $MAX_RETRIES ]; do
        echo "[INFO] Attempt $attempt of $MAX_RETRIES..."
        
        if check_health "$full_url" "$TIMEOUT"; then
            log_success
        else
            echo "[INFO] Health check failed, retrying in ${RETRY_INTERVAL}s..."
            sleep "$RETRY_INTERVAL"
        fi
        
        attempt=$((attempt + 1))
    done
    
    log_failure
}

main "$@"

```
