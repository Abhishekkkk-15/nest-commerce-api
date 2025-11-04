import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ShippingEntity } from './entities/shipping.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductService } from 'src/product/product.service';
import { OrderStatus } from './enum/order-status.enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(ShippingEntity)
    private readonly shippingRepository: Repository<ShippingEntity>,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {}
  async create(
    createOrderDto: CreateOrderDto,
    currentUser: UserEntity,
  ): Promise<OrderEntity> {
    const product = await this.productService.findOne(
      createOrderDto.product.id,
    );

    const order = this.orderRepository.create({
      product,
      user: currentUser,
      address: createOrderDto.address,
    });

    return await this.orderRepository.save(order);
  }

  async findAll(currentUser: UserEntity): Promise<OrderEntity[]> {
    return await this.orderRepository.find({
      where: {
        user: {
          id: currentUser.id,
        },
      },
    });
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<UpdateResult> {
    return await this.orderRepository.update(
      { id },
      { status: updateOrderDto.status },
    );
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.orderRepository.delete(id);
  }
}
