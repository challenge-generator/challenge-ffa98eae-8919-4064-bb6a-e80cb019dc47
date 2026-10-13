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