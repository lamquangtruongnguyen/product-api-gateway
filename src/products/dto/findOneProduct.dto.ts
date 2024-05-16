import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { FindProductByIdDto } from 'clt-jwat-common';

@InputType()
export class FindOneProductInput implements FindProductByIdDto {
  @Field((type) => ID)
  @IsUUID('4', { message: 'Incorrect ID format' })
  id: string;
}
