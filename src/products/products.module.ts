import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PRODUCT_PACKAGE_NAME } from 'clt-jwat-common';

@Module({
  providers: [ProductsResolver, ProductsService],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:5678',
          package: PRODUCT_PACKAGE_NAME,
          protoPath: join(
            __dirname,
            '../../../node_modules/clt-jwat-common/common/protos/product.proto',
          ),
        },
      },
    ]),
  ],
})
export class ProductsModule {}
