import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { ORDER_ERROR_ENUM } from '@consts/order';

import {
  UpdateOrderStatusDto as UpdateOrderStatusDtoProto,
  CreateOrderDto as CreateOrderDtoProto,
  OrderProductDto as OrderProductDtoProto,
  OrderFilterDto as OrderFilterDtoProto,
  OrderIdDto as OrderIdDtoProto,
} from 'clt-jwat-common';
import { Type } from 'class-transformer';

@InputType()
export class CreateOrderDto implements CreateOrderDtoProto {
  @IsNotEmpty({ message: ORDER_ERROR_ENUM.EMPTY_PHONE_NUMBER })
  @Field()
  phoneNumber: string;

  @IsNotEmpty({ message: ORDER_ERROR_ENUM.EMPTY_CUSTOMER_NAME })
  @Field()
  customerName: string;

  @IsNotEmpty({ message: ORDER_ERROR_ENUM.EMPTY_ADDRESS })
  @Field()
  address: string;

  @IsEmail({}, { message: ORDER_ERROR_ENUM.INVALID_EMAIL })
  @Field()
  email: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1, { message: ORDER_ERROR_ENUM.MIN_ORDER_ITEM })
  @Type(() => OrderProduct)
  @Field(() => [OrderProduct])
  orderProducts: [OrderProduct];
}

@InputType()
export class OrderProduct implements OrderProductDtoProto {
  @IsUUID('all', { message: ORDER_ERROR_ENUM.INVALID_PRODUCT_ID })
  @Field()
  productId: string;

  @IsNumber()
  @Min(1, { message: ORDER_ERROR_ENUM.MIN_QUANTITY })
  @Field((type) => Number)
  quantity: number;
}

@InputType()
export class UpdateOrderStatusDto implements UpdateOrderStatusDtoProto {
  @IsUUID('all', { message: ORDER_ERROR_ENUM.INVALID_ORDER_ID })
  @Field()
  orderId: string;

  @IsNotEmpty({ message: ORDER_ERROR_ENUM.EMPTY_STATUS })
  @Field()
  status: string;
}

@InputType()
export class OrderFilterDto implements OrderFilterDtoProto {
  @IsOptional()
  @Field({ nullable: true })
  phoneNumber?: string;

  @IsOptional()
  @Field({ nullable: true })
  email?: string;

  @IsOptional()
  @Field({ nullable: true })
  customerName?: string;

  @IsOptional()
  @Field({ nullable: true })
  address?: string;

  @IsOptional()
  @Field({ nullable: true })
  status?: string;

  @IsOptional()
  @Min(1, { message: ORDER_ERROR_ENUM.MIN_TOTAL })
  @Field((type) => Number, { nullable: true })
  minTotal?: number;

  @IsOptional()
  @Min(1, { message: ORDER_ERROR_ENUM.MAX_TOTAL })
  @Field((type) => Number, { nullable: true })
  maxTotal?: number;

  @IsOptional()
  @Field((type) => Date, { nullable: true })
  fromDate?: Date;

  @IsOptional()
  @Field((type) => Date, { nullable: true })
  toDate?: Date;
}

@InputType()
export class OrderIdDto implements OrderIdDtoProto {
  @IsUUID(undefined, { message: ORDER_ERROR_ENUM.INVALID_ORDER_ID })
  @Field()
  id: string;
}
