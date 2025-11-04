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
export class CreateReviewDto {
  @IsNotEmpty({ message: "Ratings can't be empty." })
  ratings: number;
  @IsString({ message: 'Comment must be string.' })
  @IsNotEmpty({ message: "Comment can't be empty." })
  comment: string;
  @IsNotEmpty({ message: "Product id can't be empty." })
  productId: number;
}
