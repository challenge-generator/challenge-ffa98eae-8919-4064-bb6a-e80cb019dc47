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