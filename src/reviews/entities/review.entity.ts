import { ProductEntity } from 'src/product/entities/product.entity';
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
@Entity('reviews')
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  ratings: number;
  @Column()
  comment: string;
  @CreateDateColumn()
  createdAt: Timestamp;
  @CreateDateColumn()
  updateAt: Timestamp;

  @ManyToOne(() => UserEntity, (user) => user.reviews)
  user: UserEntity;
  @ManyToOne(() => ProductEntity, (prod) => prod.reviews)
  product: ProductEntity;
}
