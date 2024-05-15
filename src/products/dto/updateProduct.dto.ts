import { CreateProductInput } from './createProduct.dto';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductDto extends PartialType(CreateProductInput) {}
