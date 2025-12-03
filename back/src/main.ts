import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from './config/config.types';
import { EnvironmentVariables } from './config/environment.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<ConfigType>);
  app.enableCors({
    origin: configService.get<EnvironmentVariables>('env')?.origin,
    credentials: true,
  });
  const PORT = configService.get<EnvironmentVariables>('env')?.port ?? 3000;

  // Custom middleware to handle Stripe webhook raw body
  app.use(
    json({
      verify: (req: any, res, buf) => {
        // Store raw body for webhook verification
        if (req.originalUrl === '/payments/webhook') {
          req.rawBody = buf;
        }
      },
    }),
  );

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
}
void bootstrap();
