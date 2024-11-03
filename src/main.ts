import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@/shared/exceptions';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DatabaseExceptionFilter } from './app/shared/exceptions/database-exception.filter';

async function bootstrap() {
  const logger = new Logger('Peru-Bus app');
  const port = envs.port || 3000;
  const app = await NestFactory.create(AppModule);

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

  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new DatabaseExceptionFilter(),
  );

  const config = new DocumentBuilder()
    .setTitle('SWAPI API')
    .setDescription('API for SWAPI')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(port, () => {
    logger.log(
      `\n🚀 Application running at port ${port}\n✅ Health check -> http://localhost:${port} `,
    );
  });
}
bootstrap();
