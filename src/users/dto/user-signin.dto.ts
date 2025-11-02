import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserSignInDto {
  @IsNotEmpty({ message: "Email can't be empty" })
  @IsEmail({}, { message: 'Please provide valid emial' })
  email: string;

  @IsString({ message: 'Password must be string' })
  @IsNotEmpty({ message: "Password can't be empty" })
  @MinLength(5, {
    message: "Password length must be grater then 5 character's",
  })
  @MaxLength(16, {
    message: "Password length must be less then 16 character's",
  })
  password: string;
}
