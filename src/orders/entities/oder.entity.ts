import { Field, ObjectType } from '@nestjs/graphql';

import { OrderItem } from './oderItem.entity';
import { BaseEntity } from '@commons/entities/base.entity';

export enum ORDER_STATUS_ENUM {
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}

@ObjectType()
export class Order extends BaseEntity {
  @Field()
  id: string;

  @Field()
  phoneNumber: string;

  @Field()
  email: string;

  @Field()
  customerName: string;

  @Field()
  address: string;

  @Field()
  status: string;

  @Field((returns) => [OrderItem])
  orderItems: OrderItem[];
}
