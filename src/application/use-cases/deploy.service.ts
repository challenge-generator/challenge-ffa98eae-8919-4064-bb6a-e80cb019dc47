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