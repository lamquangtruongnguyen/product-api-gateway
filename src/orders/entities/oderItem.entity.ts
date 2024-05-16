import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

import { BaseEntity } from '@commons/entities/base.entity';
import { Product } from '@products/entities/product.entity';

@ObjectType()
export class OrderItem extends BaseEntity {
  @Field()
  orderId: string;

  @Field()
  productId: string;

  @Field((type) => Int)
  quantity: number;

  @Field((type) => Float)
  price: number;

  @Field((type) => Product, { nullable: true })
  product: Product | undefined;
}
