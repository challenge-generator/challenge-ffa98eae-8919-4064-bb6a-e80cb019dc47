# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Diseño de plataforma de contenedores para entorno de producción**.

| | |
|---|---|
| Tema | implementa-plataformas-de-contenedores-enfocados-en-docker-y-kubernetes |
| Nivel | senior-l2 |
| Chapter | Backend |
| Especialidad | Node |
| Stack | TypeScript / NestJS 11 |
| Patron arquitectonico | microservicio reactivo con orquestación Kubernetes |
| Tiempo estimado | 40 horas |

## Receta del stack

Esqueleto obligatorio:

- `package.json y tsconfig.json en la raiz`
- `src/main.ts como bootstrap`
- `modulo raiz de Nest`
- `src/domain con entidades y puertos`
- `src/application con casos de uso`
- `src/infrastructure con repositorios y controller`

Trampas conocidas:

- No inventes versiones de npm. Usa rango con caret (`^5.7.0`) sobre una version que exista, o deja que el paquete la resuelva. Una version inexistente (ej. `@types/react-router-dom@6.19.0`) hace fallar `npm install` con ETARGET y el proyecto no instala.
- Los paquetes `@types/*` solo hacen falta para librerias que no traen sus propios tipos. React Router, NestJS y Prisma ya los traen: agregar `@types/` de esos rompe o sobra.
- El `tsconfig.json` es obligatorio: sin el, `tsc` no sabe que compilar.

Dependencias:

- @nestjs/common n/a
- @nestjs/core n/a
- @nestjs/platform-express n/a
- typescript ^5.7.0
- reflect-metadata ^0.2.0
- rxjs n/a
- @nestjs/swagger n/a
- class-validator n/a
- class-transformer n/a
- kubernetes-client ^0.20.0
- dockerode ^4.0.0

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install && npm run build` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install && npm run build` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Evaluación de herramientas de contenerización y orquestación**: Reporte de evaluación de herramientas de contenerización y orquestación.
- **Fase 2 — Implementación de la plataforma de contenedores**: Plataforma de contenedores implementada y configurada con Docker y Kubernetes.
- **Fase 3 — Validación y optimización de la plataforma de contenedores**: Plataforma de contenedores validada y optimizada para entorno de producción.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Superficie de practica (NO completes)

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs. No toques la logica que el reto pide completar.

- [ ] `Dockerfile` — El topic pide contenedores/orquestacion: este archivo es el ejercicio, no scaffolding.
- [ ] `docker-compose.yml` — El topic pide contenedores/orquestacion: este archivo es el ejercicio, no scaffolding.
- [ ] `k8s/deployments/service-deployment.yaml` — El topic pide contenedores/orquestacion: este archivo es el ejercicio, no scaffolding.
- [ ] `k8s/services/service-clusterip.yaml` — El topic pide contenedores/orquestacion: este archivo es el ejercicio, no scaffolding.
- [ ] `k8s/ingress/service-ingress.yaml` — El topic pide contenedores/orquestacion: este archivo es el ejercicio, no scaffolding.
- [ ] `k8s/configmaps/service-configmap.yaml` — El topic pide contenedores/orquestacion: este archivo es el ejercicio, no scaffolding.
- [ ] `k8s/secrets/service-secrets.yaml` — El topic pide contenedores/orquestacion: este archivo es el ejercicio, no scaffolding.
- [ ] `k8s/hpa/service-hpa.yaml` — El topic pide contenedores/orquestacion: este archivo es el ejercicio, no scaffolding.

## Lo que falta y tenes que completar

### 1. Referencias colgando (2)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `package.json` — `kubernetes-client@0.20.0`
      kubernetes-client declara la version 0.20.0, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.
- [ ] `package.json` — `typescript@5.7.0`
      typescript declara la version 5.7.0, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.

### Presentes (20)

- `package.json`
- `tsconfig.json`
- `src/main.ts`
- `src/domain/entities/service.entity.ts`
- `src/domain/ports/service.repository.port.ts`
- `src/infrastructure/repositories/kubernetes.service.repository.ts`
- `src/app.module.ts`
- `src/application/use-cases/deploy.service.ts`
- `src/infrastructure/controllers/service.controller.ts`
- `Dockerfile`
- `.dockerignore`
- `docker-compose.yml`
- `README.md`
- `k8s/deployments/service-deployment.yaml`
- `k8s/services/service-clusterip.yaml`
- `k8s/ingress/service-ingress.yaml`
- `k8s/configmaps/service-configmap.yaml`
- `k8s/secrets/service-secrets.yaml`
- `k8s/hpa/service-hpa.yaml`
- `scripts/healthcheck.sh`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `src`
- `src/domain`
- `src/application`
- `src/infrastructure`
- `src/infrastructure/controllers`
- `src/infrastructure/repositories`
- `k8s`
- `k8s/configmaps`
- `k8s/secrets`
- `k8s/deployments`
- `k8s/services`
- `k8s/ingress`
- `k8s/hpa`
- `scripts`

## Verificacion

```bash
npm install && npm run build
```

El comando tiene que pasar SIN implementar los archivos de la superficie de practica: solo andamiaje.

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **microservicio reactivo con orquestación Kubernetes**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Backend, Especialidad Desarrollador, Tecnología Node, Senior
- Brecha que el reto ataca: Implementa la contenerización y orquestación de contenedores en proyectos, teniendo en cuenta las diferencias, ventajas y desventajas de cada enfoque. Utiliza al menos dos herramientas de contenerización/orquestación, como Docker, Docker Compose, Docker Swarm, K8s (Kubernetes) u OpenShift.
- Mision: Candidato Senior con experiencia en backend, trabajando en entornos de producción.

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
