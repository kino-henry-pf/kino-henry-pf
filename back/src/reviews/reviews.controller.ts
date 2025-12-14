import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Delete(':reviewId')
  async deleteReview(@Param('reviewId') reviewId: string) {
    return await this.reviewsService.deleteReview(reviewId);
  }
}
