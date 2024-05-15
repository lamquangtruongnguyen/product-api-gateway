import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  OrderRequestDto,
  PRODUCT_PACKAGE_NAME,
  PRODUCT_SERVICE_NAME,
  ProductServiceClient,
} from 'clt-jwat-common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { FindOneProductInput } from './dto/findOneProduct.dto';
import { GraphQLError } from 'graphql';
import { SearchProductInput } from './dto/searchProduct.dto';
import { CreateProductInput } from './dto/createProduct.dto';
import { UpdateProductInput } from './dto/updateProduct.dto';

@Injectable()
export class ProductsService implements OnModuleInit {
  private productsService: ProductServiceClient;
  constructor(@Inject(PRODUCT_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.productsService =
      this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }

  async find(searchProductInput?: SearchProductInput) {
    const res = await lastValueFrom(
      this.productsService.searchProduct(searchProductInput),
    );
    if (!res.products)
      throw new GraphQLError(res.message, {
        extensions: { code: res.code },
      });
    return res.products;
  }

  async findOne(findOneProduct: FindOneProductInput) {
    const res = await lastValueFrom(
      this.productsService.findProductById(findOneProduct),
    );
    if (!res.product)
      throw new GraphQLError(res.message, {
        extensions: { code: res.code },
      });
    return res.product;
  }

  async create(createProductInput: CreateProductInput) {
    const res = await lastValueFrom(
      this.productsService.createProduct(createProductInput),
    );
    if (!res.product)
      throw new GraphQLError(res.message, { extensions: { code: res.code } });
    return res.product;
  }

  async update(id, updateProductInput: UpdateProductInput) {
    const res = await lastValueFrom(
      this.productsService.updateProduct({ ...updateProductInput, id }),
    );
    if (!res.product)
      throw new GraphQLError(res.message, { extensions: { code: res.code } });
    return res.product;
  }

  async remove(findOneProduct: FindOneProductInput) {
    const res = await lastValueFrom(
      this.productsService.findProductById(findOneProduct),
    );
    if (!res.product)
      throw new GraphQLError(res.message, { extensions: { code: res.code } });
    return res.message;
  }

  async orderRequest(orderRequestDto: OrderRequestDto) {}
}
