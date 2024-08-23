import {
  ValidationPipe,
  ValidationPipeOptions,
  VersioningType,
  Logger,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = new Logger('Main');
  app.useLogger(logger);

  const validationOptions: ValidationPipeOptions = {
    transform: true,
  };
  app.useGlobalPipes(new ValidationPipe(validationOptions));

  app.enableVersioning({ type: VersioningType.URI });

  // app.enableCors({
  //   credentials: true,
  //   methods:
  //     process.env.CORS_METHODS || 'GET, PUT, POST, PATCH, DELETE, OPTIONS',
  //   origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [],
  //   allowedHeaders: process.env.CORS_HEADERS || 'Content-Type, Accept',
  // });

  const config = new DocumentBuilder()
    .setTitle('Auth Address Service')
    .setDescription('Documentation Backend API')
    .setVersion('1.0.0')
    .addTag('Open API')
    .setVersion('1.0')
    .addCookieAuth('Authorization')
    .build();

  const swaggerPath = '/api/docs';
  app.use(
    [`/${swaggerPath}`, `/${swaggerPath}-json`],
    basicAuth({
      challenge: true,
      users: {
        [`${process.env.SWAGGER_USERNAME}`]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  const options: SwaggerCustomOptions = {
    url: `${swaggerPath}-json`,
    swaggerOptions: { persistAuthorization: true },
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, document, options);

  await app.listen(process.env.APP_PORT, () => {
    logger.log(`App listen at: ${process.env.APP_PORT}`);
  });
}
bootstrap();
