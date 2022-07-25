import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const createDocument = (app: INestApplication) : OpenAPIObject => {
    const config = new DocumentBuilder()
    .setTitle('Nest API')
    .setDescription('The Nest API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    
    return SwaggerModule.createDocument(app, config);
}