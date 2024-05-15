import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateProductDto,
  OrderRequestDto,
  PRODUCT_PACKAGE_NAME,
  PRODUCT_SERVICE_NAME,
  ProductServiceClient,
  SearchProductDto,
  UpdateProductDto,
} from 'clt-jwat-common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { FindOneProductInput } from './dto/findOneProduct.dto';

@Injectable()
export class ProductsService implements OnModuleInit {
  private productsService: ProductServiceClient;
  constructor(@Inject(PRODUCT_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.productsService =
      this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }

  async find(searchProductDto: SearchProductDto) {
    const data = await lastValueFrom(
      this.productsService.searchProduct(searchProductDto),
    );
    return data.products;
  }

  async findOne(findOneProduct: FindOneProductInput) {
    const res = await lastValueFrom(
      this.productsService.findProductById(findOneProduct),
    );
    return res.product;
  }

  async create(createProductDto: CreateProductDto) {
    return await lastValueFrom(
      this.productsService.createProduct(createProductDto),
    );
  }

  async update(updateProductDto: UpdateProductDto) {
    return await lastValueFrom(
      this.productsService.updateProduct(updateProductDto),
    );
  }

  async remove(id: string) {
    const res = await lastValueFrom(
      this.productsService.findProductById({ id }),
    );
    return res.message;
  }

  async orderRequest(orderRequestDto: OrderRequestDto) {
    return await lastValueFrom(
      this.productsService.orderRequest(orderRequestDto),
    );
  }
}
