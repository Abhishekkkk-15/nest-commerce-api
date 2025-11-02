import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserSignInDto } from './user-signin.dto';

export class UserSignUpDto extends UserSignInDto {
  @IsNotEmpty({ message: "Name can't be empty" })
  @IsString({ message: 'Name must be string' })
  name: string;
}
