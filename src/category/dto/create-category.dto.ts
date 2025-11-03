import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class CreateCategoryDto {
  // id?: string;
  @IsString({ message: 'Title must be string.' })
  @IsNotEmpty({ message: "Title can't be empty." })
  title: string;

  @IsString({ message: 'Descripition must be string.' })
  @IsNotEmpty({ message: "Descripition can't be empty." })
  descripition: string;
}
