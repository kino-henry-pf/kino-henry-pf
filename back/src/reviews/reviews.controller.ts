import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './DTOs/create-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get(':movieId')
  async getByMovie(@Param('movieId') movieId: string) {
    return await this.reviewsService.getByMovie(movieId);
  }

  @Post()
  async createReview(@Body() dto: CreateReviewDto) {
    return await this.reviewsService.createReview(dto);
  }
}
