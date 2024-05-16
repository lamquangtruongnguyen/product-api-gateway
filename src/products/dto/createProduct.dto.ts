import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { CreateProductDto } from 'clt-jwat-common';

@InputType()
export class CreateProductInput implements CreateProductDto {
  @Field()
  @Transform(({ value }) => value.trim())
  @IsString({ message: 'Name of product must be a string' })
  @IsNotEmpty({ message: "Product's name cannot be empty" })
  @Length(10, 200, { message: 'Name must be between 10 and 200 characters' })
  name: string;

  @Field()
  @Transform(({ value }) => value.trim())
  @IsString({ message: 'Make must be a string' })
  @IsNotEmpty({ message: 'Make cannot be empty' })
  @Length(10, 200, { message: 'Make must be between 10 and 200 characters' })
  make: string;

  @Field({ nullable: true })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(10, 200, {
    message: 'Category must be between 10 and 200 characters',
  })
  category?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  description?: string;

  @Field()
  @IsNumber()
  @Min(0, { message: 'price must be at least 0' })
  price: number;

  @Field()
  @IsNumber()
  @Min(0, { message: 'quantity must be at least 0' })
  quantity: number;
}
