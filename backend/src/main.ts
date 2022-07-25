import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata";
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument } from './shared/swagger';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './shared/middlewares/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const APP_VERSION = process.env.APP_VERSION || 'v1';
  app.setGlobalPrefix(`api/${APP_VERSION}`);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  app.useGlobalInterceptors(new TransformInterceptor());
  SwaggerModule.setup('swagger', app, createDocument(app));

  const PORT = parseInt(process.env.APP_PORT, 10) || 3000;
  console.log(`Server running in port http://localhost:${PORT}.`);
  await app.listen(PORT);
}
bootstrap();
