import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('revenue')
  async getTotalRevenue() {
    const totalRevenue = await this.analyticsService.getTotalRevenue();
    return { totalRevenue };
  }

  @Get('total-tickets')
  async getTotalTickets() {
    return await this.analyticsService.getTotalTickets();
  }

  @Get('total-products')
  async getTotalProducts() {
    return await this.analyticsService.getTotalProductsSold();
  }

  @Get('rooms/occupancy')
  async getRoomsOccupancy() {
    return await this.analyticsService.getRoomOccupancy();
  }
}
