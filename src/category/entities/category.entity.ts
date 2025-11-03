import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  descripition: string;
  @CreateDateColumn()
  createdAt: Timestamp;
  @CreateDateColumn()
  updateAt: Timestamp;
  @ManyToOne(() => UserEntity, (user) => user.categories)
  addedUser: UserEntity;
}
