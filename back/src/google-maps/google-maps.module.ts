import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoogleMapsService } from './google-maps.service';
import { GoogleMapsController } from './google-maps.controller';

@Module({
  imports: [ConfigModule], // Para acceder a las variables de entorno
  providers: [GoogleMapsService],
  exports: [GoogleMapsService],
  controllers: [GoogleMapsController], // 👈 IMPORTANTE: Exportar para que otros módulos lo usen
})
export class GoogleMapsModule {}