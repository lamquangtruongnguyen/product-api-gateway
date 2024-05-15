import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  make: string;

  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  price: number;

  @Field()
  quantity: number;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;

  @Field()
  updatedAt: Date;
}
