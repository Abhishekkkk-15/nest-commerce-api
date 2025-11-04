import { IsEmpty, IsNotEmpty } from 'class-validator';
import { ProductEntity } from 'src/product/entities/product.entity';
import { ShippingEntity } from '../entities/shipping.entity';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'Product must be provided.' })
  product: ProductEntity;
  @IsNotEmpty({ message: 'Product must be provided.' })
  address: ShippingEntity;
}

class AddressType {
  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  number: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  pincode: number;
}
