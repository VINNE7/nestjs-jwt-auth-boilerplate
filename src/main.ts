import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { configureSwaggerDocs } from './shared/helpers/configure-swagger-docs.helper';
import { configureAuthSwaggerDocs } from './shared/helpers/configure-auth-swagger-docs.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors({
    origin: configService.get<string>('ENDPOINT_CORS'),
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
  });
  const port = configService.get<number>('NODE_API_PORT') || 3001;

  // Swagger Configuration

  configureAuthSwaggerDocs(app, configService);
  configureSwaggerDocs(app, configService);

  await app.listen(port, '0.0.0.0');
  Logger.log(
    `${await app.getUrl()} - Enviroment: ${configService.get<string>(
      'NODE_ENV',
    )}`,
    'Enviroment',
  );
}
bootstrap();
