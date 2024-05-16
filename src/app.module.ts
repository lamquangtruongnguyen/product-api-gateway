import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { HttpStatus, Module } from '@nestjs/common';
import { ApolloServerErrorCode } from '@apollo/server/errors';

import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      // formatError: (error) => {
      //   if (error.extensions.originalError)
      //     return error.extensions?.originalError;

      //   return { message: error.message, code: error.extensions?.code, statusCode };
      // },
      formatError: (formattedError, _error: any) => {
        //graphQL validation failed
        if (
          formattedError.extensions.code ===
          ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED
        ) {
          return {
            message: [formattedError.message],
            status: HttpStatus.BAD_REQUEST,
          };
        }

        //class validator throw error
        if (formattedError.extensions.originalError) {
          const originalError = formattedError.extensions.originalError as any;
          if (originalError.message?.constructor !== Array)
            originalError.message = [originalError.message];
          return {
            message: originalError.message || ['Bad request'],
            status: originalError.statusCode || HttpStatus.BAD_REQUEST,
          };
        }

        //others
        return {
          message: [formattedError.message],
          status:
            formattedError.extensions.code || HttpStatus.INTERNAL_SERVER_ERROR,
        };
      },
    }),
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
