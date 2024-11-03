import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configure } from '@codegenie/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@/shared/exceptions';

import { envs } from './config';

let server: Handler;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: [
      'Content-Type',
      'Accept',
      'X-Amz-Date',
      'Authorization',
      'X-Api-Key',
      'X-Amz-Security-Token',
    ],
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  const serverEnv =
    envs.environment === 'production'
      ? 'prod'
      : envs.environment === 'staging'
        ? 'stg'
        : 'dev';

  const config = new DocumentBuilder()
    .setTitle('TAXI-REMISSE API')
    .setDescription('API for Taxi-Remisse Software')
    .setVersion('1.0')
    .addServer(`/${serverEnv}`, `${envs.environment}`)
    .addServer(
      'https://r8vculb92m.execute-api.sa-east-1.amazonaws.com/prod',
      'production',
    )
    .addServer(
      'https://e6as7ngjkl.execute-api.sa-east-1.amazonaws.com/stg',
      'staging',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.init();

  const expressHandler = app.getHttpAdapter().getInstance();

  return configure({ app: expressHandler });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
