import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './DTOs/create-review.dto';

@Injectable()
export default class ReviewsRepository {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
  ) {}

  async getByMovie(movieId: string) {
    return await this.reviewsRepository.find({
      where: { movie: { id: movieId } },
      relations: ['user'],
    });
  }

  async createReview(dto: CreateReviewDto) {
    const review = this.reviewsRepository.create({
      rating: dto.rating,
      review: dto.review,
      user: { id: dto.userId },
      movie: { id: dto.movieId },
    });

    return await this.reviewsRepository.save(review);
  }
}
