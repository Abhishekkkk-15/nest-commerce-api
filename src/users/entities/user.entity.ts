import { Role } from 'src/utilty/comman/user-role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
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
}
