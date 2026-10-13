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