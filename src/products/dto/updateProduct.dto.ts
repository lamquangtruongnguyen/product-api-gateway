import { CreateProductInput } from './createProduct.dto';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {}
