import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { Timestamp } from 'typeorm/browser';
@Entity('shippingsAddress')
export class ShippingEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  phone: number;
  @Column()
  name: string;
  @Column()
  city: string;
  @Column()
  pincode: number;
  @OneToMany(() => OrderEntity, (ord) => ord.address)
  orders: OrderEntity;
}
