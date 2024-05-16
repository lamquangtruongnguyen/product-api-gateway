import {
  ORDER_PACKAGE_NAME,
  ORDER_SERVICE_NAME,
  OrderServiceClient,
} from 'clt-jwat-common';
import { lastValueFrom } from 'rxjs';
import { GraphQLError } from 'graphql';
import { ClientGrpc } from '@nestjs/microservices';
import { HttpStatus, Inject, Injectable, OnModuleInit } from '@nestjs/common';

import {
  CreateOrderDto,
  OrderFilterDto,
  OrderIdDto,
  UpdateOrderStatusDto,
} from './dto/order.dto';
import { ORDER_ERROR_ENUM } from '@consts/order';

@Injectable()
export class OrdersService implements OnModuleInit {
  private ordersService: OrderServiceClient;

  constructor(@Inject(ORDER_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.ordersService =
      this.client.getService<OrderServiceClient>(ORDER_SERVICE_NAME);
  }

  async findOrderById(request: OrderIdDto) {
    const res = await lastValueFrom(this.ordersService.findOrderById(request));

    if (!res.order)
      throw new GraphQLError(res.message || ORDER_ERROR_ENUM.ORDER_NOT_FOUND, {
        extensions: {
          code: res.code,
        },
      });

    return res.order;
  }

  async findOrderWithFilter(request: OrderFilterDto) {
    const res = await lastValueFrom(
      this.ordersService.findOrderWithFilter(request),
    );

    if (!res.orders && res.code === HttpStatus.OK)
      throw new GraphQLError(ORDER_ERROR_ENUM.ORDERS_NOT_FOUND, {
        extensions: {
          code: HttpStatus.NOT_FOUND,
        },
      });

    if (!res.orders)
      throw new GraphQLError(res.message || ORDER_ERROR_ENUM.ORDERS_NOT_FOUND, {
        extensions: {
          code: res.code,
        },
      });

    return res.orders;
  }

  async createOrder(request: CreateOrderDto) {
    const res = await lastValueFrom(this.ordersService.createOrder(request));

    if (!res.order)
      throw new GraphQLError(
        res.message || ORDER_ERROR_ENUM.CREATE_ORDER_FAILED,
        {
          extensions: {
            code: res.code,
          },
        },
      );

    return res.order;
  }

  async updateOrderStatus(request: UpdateOrderStatusDto) {
    const res = await lastValueFrom(
      this.ordersService.updateOrderStatus(request),
    );

    if (!res.order)
      throw new GraphQLError(
        res.message || ORDER_ERROR_ENUM.CREATE_ORDER_FAILED,
        {
          extensions: {
            code: res.code,
          },
        },
      );

    return res.order;
  }

  async deleteOrder(request: OrderIdDto) {
    const res = await lastValueFrom(this.ordersService.deleteOrder(request));

    if (!res.order)
      throw new GraphQLError(
        res.message || ORDER_ERROR_ENUM.CREATE_ORDER_FAILED,
        {
          extensions: {
            code: res.code,
          },
        },
      );

    return res.order;
  }
}
