import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { CurrentUser } from 'src/utilty/decorators/current-user.decorator';
import { PartialType } from '@nestjs/mapped-types';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    currentUser: UserEntity,
  ): Promise<CategoryEntity> {
    const newCat = this.categoryRepository.create({
      ...createCategoryDto,
      addedUser: currentUser,
    });

    return await this.categoryRepository.save(newCat);
  }

  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: {
        id: id,
      },
      select: {
        addedUser: {
          name: true,
          id: true,
          email: true,
        },
      },
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(
    id: number,
    updateCategoryDto: Partial<UpdateCategoryDto>,
  ): Promise<CategoryEntity> {
    const category = await this.findOne(updateCategoryDto.id as number);
    if (!category) throw new NotFoundException('Category not found');
    Object.assign(category, updateCategoryDto); // Merging tow object -> updateCategoryDto data merging to category obj
    const udpatedCat = await this.categoryRepository.save(category);
    return udpatedCat;
  }

  async remove(id: number) {
    return await this.categoryRepository.delete({ id: id });
  }
}
