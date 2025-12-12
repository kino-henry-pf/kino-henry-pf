import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GoogleMapsService } from './google-maps.service';
import { Roles } from 'src/decorator/role.decorator';
import { ROLE } from 'src/users/entity/user.entity';
import { AuthGuard } from 'src/auth/guards/auth-guard.guard';
import { RolesGuard } from 'src/auth/guards/role-guard.guard';

@Controller('google-maps')
export class GoogleMapsController {
    constructor(
        private readonly googleMapsService: GoogleMapsService
    ) {}

    @Get(":lat/:lng")
    @Roles(ROLE.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    async getReverseGeocode(
        @Param("lat") lat: string,
        @Param("lng") lng: string
    ) {
        return await this.googleMapsService.reverseGeocode(
            parseFloat(lat),
            parseFloat(lng)
        )
    }
}
