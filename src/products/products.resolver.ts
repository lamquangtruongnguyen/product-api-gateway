import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { SearchProductDto } from 'clt-jwat-common';
import { FindOneProductInput } from './dto/findOneProduct.dto';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product], { name: 'products' })
  find(
    @Args('searchProductDto', { nullable: true })
    searchProductDto: SearchProductDto,
  ) {
    return this.productsService.find(searchProductDto);
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('findOneProduct') findOneProduct: FindOneProductInput) {
    return this.productsService.findOne(findOneProduct);
  }

  // @Mutation(() => String)
  // remove(@Args('id') id: string) {
  //   return this.productsService.remove(id);
  // }
}
