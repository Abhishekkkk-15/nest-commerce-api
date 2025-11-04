import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductService } from 'src/product/product.service';
import { AuthenticationGuard } from 'src/utilty/guards/authentication.guard';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    private readonly productService: ProductService,
  ) {}
  async create(
    createReviewDto: CreateReviewDto,
    user: UserEntity,
  ): Promise<ReviewEntity> {
    const product = await this.productService.findOne(
      createReviewDto.productId,
    );
    const createReview = this.reviewRepository.create({
      ...createReviewDto,
      user: user,
      product,
    });
    return await this.reviewRepository.save(createReview);
  }
  async findAll(productId: number): Promise<ReviewEntity[]> {
    const productReviews = await this.reviewRepository.find({
      where: {
        product: {
          id: productId,
        },
      },
    });
    return productReviews;
  }
  async update(
    id: number,
    updateReviewDto: Partial<UpdateReviewDto>,
    currentUser: UserEntity,
  ): Promise<ReviewEntity> {
    const oldReview = await this.reviewRepository.findOne({
      relations: {
        user: true,
      },
      where: { id },
      select: {
        user: {
          id: true,
        },
      },
    });
    if (oldReview) console.log('ID', id, currentUser.id, oldReview);

    if (!oldReview) throw new NotFoundException('Review not found.');
    if (oldReview.user.id != currentUser.id)
      throw new UnauthorizedException('Unauthized user.');
    Object.assign(oldReview, updateReviewDto);
    const updatedReview = await this.reviewRepository.save(oldReview);

    return updatedReview;
  }
  async remove(id: number): Promise<DeleteResult> {
    return await this.reviewRepository.delete(id);
  }
}
