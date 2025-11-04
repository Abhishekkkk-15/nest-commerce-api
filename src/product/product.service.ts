import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DeleteResult, Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentUser } from 'src/utilty/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { CategoryService } from 'src/category/category.service';
import { promises } from 'dns';
import { dataSource } from 'db/data-source';
import { title } from 'process';
import { OrdersService } from 'src/orders/orders.service';

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
  ): Promise<ProductEntity> {
    const category = await this.categoryService.findOne(catId);
    const newProdct = {
      ...createProductDto,
      addedBy: currentUser,
      category: category,
    };
    const createProduct = this.productRepository.create(newProdct);

    return await this.productRepository.save(createProduct);
  }

  async findAll(query: any): Promise<any> {
    // const allProducts = await this.productRepository.find({
    //   relations: {
    //     addedBy: true,
    //     category: true,
    //   },
    //   select: {
    //     addedBy: {
    //       id: true,
    //       email: true,
    //       name: true,
    //     },
    //     category: {
    //       title: true,
    //       descripition: true,
    //     },
    //   },
    // });
    // if (!allProducts) throw new NotFoundException("Product's not found.");
    // return allProducts;
    let filterdTotalProducts: number;
    let limit: number;
    if (!query.limit) {
      limit = 4;
    } else {
      limit = query.limit;
    }
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoin('product.reviews', 'review')
      .addSelect([
        'COUNT(review.id) AS reviewCount',
        'AVG(review.ratings)::numeric(10,2) AS avgRatings',
      ])
      .groupBy('product.id,category.id');
    const totalProductCount = await queryBuilder.getCount();
    if (query.search) {
      const search = query.search;
      queryBuilder.andWhere('product.title like :title', {
        title: `%${search}%`,
      });
    }
    if (query.category) {
      queryBuilder.andWhere('category.id=:id', {
        id: query.category,
      });
    }
    if (query.minPrice) {
      queryBuilder.andWhere('product.price>=:minPrice', {
        minPrice: query.minPrice,
      });
    }
    if (query.maxPrice) {
      queryBuilder.andWhere('product.price<=:minPrice', {
        maxPrice: query.maxPrice,
      });
    }
    if (query.offset) {
      queryBuilder.offset(query.offset);
    }

    queryBuilder.limit(limit);
    const products = await queryBuilder.getRawMany();

    return { totalProductCount, products };
  }

  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!product) throw new NotFoundException('Product not found.');
    return product;
  }

  async update(
    id: number,
    updateProductDto: Partial<UpdateProductDto>,
  ): Promise<ProductEntity> {
    const oldProduct = await this.productRepository.findOne({
      where: {
        id,
      },
    });
    if (!oldProduct) throw new NotFoundException('Prodcuct not found!');
    if (updateProductDto.catId) {
      oldProduct.category = await this.categoryService.findOne(
        updateProductDto.catId as number,
      );
    }
    Object.assign(oldProduct, updateProductDto);
    const updatedProduct = await this.productRepository.save(oldProduct);
    return oldProduct;
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.productRepository.delete(id);
  }
}
