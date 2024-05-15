import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    ProductsModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      // formatError: (error) => ({
      //   message: error.message,
      //   code: error.extensions?.code,
      //   originalMessage: error.extensions?.originalError,
      // }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
