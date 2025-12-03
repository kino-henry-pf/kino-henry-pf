import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from './config/config.types';
import { EnvironmentVariables } from './config/environment.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  const configService = app.get(ConfigService<ConfigType>);
  const env = configService.get<EnvironmentVariables>('env');

  app.enableCors({
    origin: [env?.origin, 'http://localhost:3000'],
    credentials: true,
  });

  const PORT = env?.port ?? 3000;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('KINO API Documentation')
    .setDescription('Endpoints of the Kino project API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(PORT);
  console.log(`Server listening on port ${PORT}`);
  console.log(process.env.GMAIL_USER); // solo para probar
}

void bootstrap();
