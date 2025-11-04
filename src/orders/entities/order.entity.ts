import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { OrderStatus } from '../enum/order-status.enum';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { ShippingEntity } from './shipping.entity';
@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  orderAt: Timestamp;
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PROCESSING })
  status: string;
  @Column({ nullable: true })
  shippedAt: Date;
  @Column({ nullable: true })
  deleverdAt: Date;
  @CreateDateColumn()
  createdAt: Timestamp;
  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;
  @ManyToOne(() => ProductEntity, (prod) => prod.orders)
  product: ProductEntity;
  @OneToOne(() => ShippingEntity, (cas) => cas.orders, { cascade: true })
  @JoinColumn()
  address: ShippingEntity;
}
