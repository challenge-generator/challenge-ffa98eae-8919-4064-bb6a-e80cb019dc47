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