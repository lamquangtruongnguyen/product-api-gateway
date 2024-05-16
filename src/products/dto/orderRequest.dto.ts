import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { OrderItemRequestDto, OrderRequestDto } from 'clt-jwat-common';

@InputType()
export class OrderRequestInput implements OrderRequestDto {
  @Field((type) => [OrderRequestItem])
  items: OrderItemRequestDto[];
}

@InputType()
class OrderRequestItem implements OrderItemRequestDto {
  @Field((type) => ID)
  productId: string;

  @Field((type) => Int)
  quantity: number;
}
