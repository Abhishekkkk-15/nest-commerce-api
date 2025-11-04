import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Password must be string.' })
  @IsNotEmpty({ message: "Title can't be empty." })
  title: string;
  @IsString({ message: 'descripition must be string.' })
  @IsNotEmpty({ message: "descripition can't be empty." })
  descripition: string;
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Price should be number.' })
  @IsNotEmpty({ message: "Price can't be empty." })
  @IsPositive({ message: 'Price should be positive number.' })
  price: number;
  @IsNumber({}, { message: 'Stock can not be empty.' })
  @IsNotEmpty({ message: "Stock can't be empty." })
  @Min(0, { message: 'Stock cannot be nagative.' })
  stock: number;
  @IsNotEmpty({ message: "Images can't be empty." })
  @IsArray()
  images: string[];
  // @IsNumber({}, { message: 'Category can not be empty.' })
  // @IsNotEmpty({ message: "Category can't be empty." })
  // category: number;
}
