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
}
