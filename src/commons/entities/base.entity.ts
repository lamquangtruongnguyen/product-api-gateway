import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export abstract class BaseEntity {
  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  deletedAt?: Date;

  @Field((type) => Date)
  updatedAt: Date;
}
