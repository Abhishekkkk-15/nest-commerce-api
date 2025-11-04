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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CurrentUser } from 'src/utilty/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { OrderStatus } from './enum/order-status.enum';
import { OrderEntity } from './entities/order.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AuthorizeRoles } from 'src/utilty/decorators/authorize-roles.decorator';
import { AuthenticationGuard } from 'src/utilty/guards/authentication.guard';
import { AuthorizeGuard } from 'src/utilty/guards/authorized.guard';
import { Role } from 'src/utilty/comman/user-role.enum';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @UseGuards(AuthenticationGuard)
  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<OrderEntity> {
    return this.ordersService.create(createOrderDto, currentUser);
  }
  @UseGuards(AuthenticationGuard)
  @Get()
  findAll(@CurrentUser() currentUser: UserEntity): Promise<OrderEntity[]> {
    return this.ordersService.findAll(currentUser);
  }
  @UseGuards(AuthenticationGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<UpdateResult> {
    return this.ordersService.update(+id, updateOrderDto);
  }
  @UseGuards(AuthenticationGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.ordersService.remove(+id);
  }
}
