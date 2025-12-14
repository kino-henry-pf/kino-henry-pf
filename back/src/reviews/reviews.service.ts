import { Injectable, NotFoundException } from '@nestjs/common';
import ReviewsRepository from './reviews.repository';
import { CreateReviewDto } from './DTOs/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly reviewsRepository: ReviewsRepository) {}

  async getByMovie(movieId: string) {
    return await this.reviewsRepository.getByMovie(movieId);
  }

  async createReview(dto: CreateReviewDto) {
    return await this.reviewsRepository.createReview(dto);
  }

  async deleteReview(reviewId: string) {
    const reviewDeleted = await this.reviewsRepository.deleteReview(reviewId);
    if (!reviewDeleted)
      throw new NotFoundException(
        `No review with an id of ${reviewId} exists.`,
      );
    return 'Deleted review successfully';
  }
}
