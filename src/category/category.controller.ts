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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { CurrentUser } from 'src/utilty/decorators/current-user.decorator';
import { Role } from 'src/utilty/comman/user-role.enum';
import { AuthorizeRoles } from 'src/utilty/decorators/authorize-roles.decorator';
import { AuthenticationGuard } from 'src/utilty/guards/authentication.guard';
import { AuthorizeGuard } from 'src/utilty/guards/authorized.guard';
import { CategoryEntity } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @AuthorizeRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Get()
  findAll(): Promise<CategoryEntity[]> {
    return this.categoryService.findAll();
  }

  @AuthorizeRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Post('create')
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<CategoryEntity> {
    return await this.categoryService.create(createCategoryDto, currentUser);
  }
  @AuthorizeRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.categoryService.update(+id, updateCategoryDto);
  }
  @AuthorizeRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
