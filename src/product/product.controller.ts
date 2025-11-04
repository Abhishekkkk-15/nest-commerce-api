import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { CurrentUser } from 'src/utilty/decorators/current-user.decorator';
import {
  SerializeIncludes,
  SerializeInterceptor,
} from 'src/utilty/intercepter/serialize.intercepter';
import { ProdcuctDto } from './dto/products.dto';
import { AuthenticationGuard } from 'src/utilty/guards/authentication.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @UseGuards(AuthenticationGuard)
  @Post(':id')
  create(
    @Param('id') id: string,
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return this.productService.create(
      Number(id),
      createProductDto,
      currentUser,
    );
  }
  @SerializeIncludes(ProdcuctDto)
  @Get('')
  async findAll(@Query() query: any): Promise<ProdcuctDto> {
    console.log('middle');
    return await this.productService.findAll(query);
  }
  @UseGuards(AuthenticationGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }
  @Patch(':id')
  @UseGuards(AuthenticationGuard)
  update(
    @Param('id') id: string,
    @Body() updateProductDto: Partial<UpdateProductDto>,
  ) {
    return this.productService.update(+id, updateProductDto);
  }
  @UseGuards(AuthenticationGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
