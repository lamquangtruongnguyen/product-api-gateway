import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/createProduct.dto';
import { FindOneProductInput } from './dto/findOneProduct.dto';
import { SearchProductInput } from './dto/searchProduct.dto';
import { UpdateProductInput } from './dto/updateProduct.dto';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query((returns) => [Product], { name: 'products' })
  find(
    @Args('searchProductInput', { nullable: true })
    searchProductInput?: SearchProductInput,
  ) {
    return this.productsService.find(searchProductInput);
  }

  @Query((returns) => Product, { name: 'product' })
  findOne(@Args('findOneProduct') findOneProduct: FindOneProductInput) {
    return this.productsService.findOne(findOneProduct);
  }

  @Mutation((returns) => Product)
  create(@Args('createProductInput') createProductInput: CreateProductInput) {
    return this.productsService.create(createProductInput);
  }

  @Mutation((returns) => Product)
  update(
    @Args('id', ParseUUIDPipe) id: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productsService.update(id, updateProductInput);
  }

  @Mutation(() => Product)
  remove(@Args('findOneProduct') findOneProduct: FindOneProductInput) {
    return this.productsService.remove(findOneProduct);
  }
}
