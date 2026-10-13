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