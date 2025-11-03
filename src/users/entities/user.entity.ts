import { CategoryEntity } from 'src/category/entities/category.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { Role } from 'src/utilty/comman/user-role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column({ select: false })
  password: string;
  @Column({ type: 'enum', enum: Role, array: true, default: [Role.USER] })
  role: Role[];
  @CreateDateColumn()
  createdAt: Timestamp;
  @CreateDateColumn()
  updateAt: Timestamp;
  @OneToMany(() => CategoryEntity, (cat) => cat.addedUser)
  categories: CategoryEntity[];
  @OneToMany(() => ProductEntity, (prod) => prod.addedBy)
  products: ProductEntity[];
}
