import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CurrentUser } from 'src/utilty/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthorizeRoles } from 'src/utilty/decorators/authorize-roles.decorator';
import { Role } from 'src/utilty/comman/user-role.enum';
import { AuthenticationGuard } from 'src/utilty/guards/authentication.guard';
import { AuthorizeGuard } from 'src/utilty/guards/authorized.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}
  @UseGuards(AuthenticationGuard)
  @Post()
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return await this.reviewsService.create(createReviewDto, currentUser);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.reviewsService.findAll(+id);
  }

  @UseGuards(AuthenticationGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReviewDto: Partial<UpdateReviewDto>,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return this.reviewsService.update(+id, updateReviewDto, currentUser);
  }
  @UseGuards(AuthenticationGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
