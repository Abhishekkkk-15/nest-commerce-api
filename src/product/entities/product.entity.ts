import { CategoryEntity } from 'src/category/entities/category.entity';
import { OrderEntity } from 'src/orders/entities/order.entity';
import { ReviewEntity } from 'src/reviews/entities/review.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  descripition: string;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;
  @Column()
  stock: number;
  @Column('simple-array')
  images: string[];
  @CreateDateColumn()
  createdAt: Timestamp;
  @CreateDateColumn()
  updateAt: Timestamp;
  @ManyToOne(() => UserEntity, (user) => user.products)
  addedBy: UserEntity;
  @ManyToOne(() => CategoryEntity, (cat) => cat.products)
  category: CategoryEntity;
  @OneToMany(() => ReviewEntity, (rev) => rev.product)
  reviews: ReviewEntity[];
  @OneToMany(() => OrderEntity, (ord) => ord.product)
  orders: OrderEntity[];
}
