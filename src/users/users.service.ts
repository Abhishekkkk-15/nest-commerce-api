import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignUpDto } from './dto/user.signup.dto';
import { ConflictException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { UserSignInDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';
config();
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async signup(userDto: UserSignUpDto): Promise<{ user: UserEntity }> {
    const emailExists = await this.findUserByEmail(userDto.email);
    if (emailExists) throw new BadRequestException('Email already exists');
    userDto.password = await hash(userDto.password, 10);
    let newUser = this.userRepository.create(userDto);
    newUser = await this.userRepository.save(newUser);
    return { user: newUser };
  }

  async signin(userSignUpDto: UserSignInDto): Promise<UserEntity | null> {
    const user = await this.userRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: userSignUpDto.email })
      .getOne();
    if (!user) throw new BadRequestException('User not found');
    const isUserValid = await compare(userSignUpDto.password, user.password);
    console.log('here', isUserValid);
    if (!isUserValid) throw new UnauthorizedException('Invalid creadentials');
    return user;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) return;
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(userEmail: string): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findOneBy({ email: userEmail });
    if (!user) {
      return;
    }
    return user;
  }

  genAccessToken(user: UserEntity): string {
    const secret = process.env.ACCESS_TOKEN_SECRET as string;
    const expiresIn = process.env.ACCESS_TOKEN_EXPIRE as string;

    if (!secret || !expiresIn) {
      throw new Error('Missing JWT environment variables');
    }

    return sign({ id: user.id, email: user.email }, secret, {
      expiresIn: '30m',
    });
  }
}
