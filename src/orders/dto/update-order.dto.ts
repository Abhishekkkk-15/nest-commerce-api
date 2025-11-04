import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatus } from '../enum/order-status.enum';

export class UpdateOrderDto {
  @IsEnum(OrderStatus, { message: 'Invalid order status.' })
  status: OrderStatus;
}
