import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import {
  CreateOrderDto,
  OrderFilterDto,
  OrderIdDto,
  UpdateOrderStatusDto,
} from './dto/order.dto';
import { Order } from './entities/oder.entity';
import { OrdersService } from './orders.service';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query(() => Order)
  findOrderById(@Args('orderIdDto') request: OrderIdDto) {
    return this.ordersService.findOrderById(request);
  }

  @Query(() => [Order])
  findOrderWithFilter(@Args('orderFilterDto') request: OrderFilterDto) {
    return this.ordersService.findOrderWithFilter(request);
  }

  @Mutation(() => Order)
  createOrder(@Args('createOrderDto') request: CreateOrderDto) {
    return this.ordersService.createOrder(request);
  }

  @Mutation(() => Order)
  updateOrderStatus(@Args('updateOrderDto') request: UpdateOrderStatusDto) {
    return this.ordersService.updateOrderStatus(request);
  }

  @Mutation(() => Order)
  deleteOrder(@Args('orderIdDto') request: OrderIdDto) {
    return this.ordersService.deleteOrder(request);
  }
}
