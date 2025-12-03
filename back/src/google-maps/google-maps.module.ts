import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoogleMapsService } from './google-maps.service';

@Module({
  imports: [ConfigModule], // Para acceder a las variables de entorno
  providers: [GoogleMapsService],
  exports: [GoogleMapsService], // 👈 IMPORTANTE: Exportar para que otros módulos lo usen
})
export class GoogleMapsModule {}