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