import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from 'config/config.types';
import { EnvironmentVariables } from 'config/environment.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<ConfigType>);
  app.enableCors({
    origin: configService.get<EnvironmentVariables>('env')?.origin,
    credentials: true,
  });
  const PORT = configService.get<EnvironmentVariables>('env')?.port ?? 3000;
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(PORT);
  console.log(`Server listening on port ${PORT}`);
}
void bootstrap();
