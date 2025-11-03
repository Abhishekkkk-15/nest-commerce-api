import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Password must be string.' })
  @IsNotEmpty({ message: "Title can't be empty." })
  title: string;
  @IsString({ message: 'descripition must be string.' })
  @IsNotEmpty({ message: "descripition can't be empty." })
  descripition: string;
  @IsNumber()
  @IsNotEmpty({ message: "Price can't be empty." })
  price: number;
  @IsNumber()
  @IsNotEmpty({ message: "Stock can't be empty." })
  stock: number;
  @IsArray()
  images: string[];
}
