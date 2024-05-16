import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_PACKAGE_NAME } from 'clt-jwat-common';

@Module({
  providers: [OrdersResolver, OrdersService],
  imports: [
    ClientsModule.register([
      {
        name: ORDER_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: ORDER_PACKAGE_NAME,
          protoPath: 'node_modules/clt-jwat-common/common/protos/order.proto',
          url: 'localhost:4001',
        },
      },
    ]),
  ],
})
export class OrdersModule {}
