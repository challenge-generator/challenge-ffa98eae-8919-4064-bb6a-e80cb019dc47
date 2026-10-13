# Diseño de plataforma de contenedores para entorno de producción

El equipo de desarrollo backend requiere implementar una plataforma de contenedores robusta y escalable para un entorno de producción. Se deben considerar las diferencias, ventajas y desventajas de Docker y Kubernetes, y elegir la combinación más adecuada. La plataforma debe soportar la contenerización y orquestación de servicios, asegurando alta disponibilidad y facilidad de mantenimiento.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | implementa-plataformas-de-contenedores-enfocados-en-docker-y-kubernetes |
| **Nivel** | senior-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 40 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Evaluación de herramientas de contenerización y orquestación

**Objetivo:** Identificar y evaluar las herramientas de contenerización y orquestación más adecuadas para el entorno de producción.

**Tiempo estimado:** 8 horas

**Instrucciones:**

- Investiga y compara las características, ventajas y desventajas de Docker, Docker Compose, Docker Swarm y Kubernetes.
- Evalúa la idoneidad de cada herramienta para el entorno de producción del equipo de desarrollo backend.
- Elige la combinación de herramientas que mejor se ajuste a las necesidades del equipo.

**Entregable:** Reporte de evaluación de herramientas de contenerización y orquestación.

<details>
<summary>Pistas de conocimiento</summary>

- Considera la escalabilidad, facilidad de uso, soporte de la comunidad y documentación disponible para cada herramienta.
- Evalúa la integración de las herramientas con el stack tecnológico del equipo (Node.js).

</details>

### Fase 2: Implementación de la plataforma de contenedores

**Objetivo:** Implementar la plataforma de contenedores utilizando la combinación de herramientas elegida en la fase anterior.

**Tiempo estimado:** 16 horas

**Instrucciones:**

- Configura Docker y Kubernetes en un entorno de desarrollo.
- Crea Dockerfiles y configuraciones de Kubernetes para los servicios del equipo de desarrollo backend.
- Implementa la orquestación de los servicios utilizando Kubernetes.

**Entregable:** Plataforma de contenedores implementada y configurada con Docker y Kubernetes.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza best practices para la creación de Dockerfiles y configuraciones de Kubernetes.
- Considera la gestión de secretos y configuraciones en Kubernetes.

</details>

### Fase 3: Validación y optimización de la plataforma de contenedores

**Objetivo:** Validar y optimizar la plataforma de contenedores para asegurar su robustez y eficiencia en un entorno de producción.

**Tiempo estimado:** 16 horas

**Instrucciones:**

- Realiza pruebas de carga y estrés en la plataforma de contenedores.
- Identifica y resuelve cuellos de botella y puntos de falla.
- Optimiza la configuración de Docker y Kubernetes para mejorar el rendimiento y la escalabilidad.

**Entregable:** Plataforma de contenedores validada y optimizada para entorno de producción.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza herramientas de monitoreo y logging para identificar problemas y optimizar la plataforma.
- Considera la implementación de auto-escalado y balanceo de carga en Kubernetes.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es una plataforma de contenedores y por qué es importante para un entorno de producción?
- **paraQueSirve**: ¿Para qué sirve la orquestación de contenedores en un entorno de producción?
- **comoSeUsa**: ¿Cómo se utilizan Docker y Kubernetes para implementar una plataforma de contenedores?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar una plataforma de contenedores y cómo se pueden evitar?
- **queDecisionesImplica**: ¿Qué decisiones implica la elección de una combinación de herramientas de contenerización y orquestación para un entorno de producción?

## Criterios de Evaluacion

- Reporte de evaluación de herramientas de contenerización y orquestación entregado.
- Plataforma de contenedores implementada y configurada con Docker y Kubernetes entregada.
- Plataforma de contenedores validada y optimizada para entorno de producción entregada.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT). Devuelve un ZIP con el proyecto. Sirve si no tenes un agente en el IDE.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
