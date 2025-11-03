import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentUser } from 'src/utilty/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoryService,
  ) {}

  async create(
    catId: number,
    createProductDto: CreateProductDto,
    currentUser: UserEntity,
  ) {
    const category = await this.categoryService.findOne(catId);
    const newProdct = {
      ...createProductDto,
      addedBy: currentUser,
      category: category,
    };
    const createProduct = this.productRepository.create(newProdct);

    return await this.productRepository.save(createProduct);
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
