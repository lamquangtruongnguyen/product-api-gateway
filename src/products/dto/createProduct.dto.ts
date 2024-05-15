import { InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { CreateProductDto } from 'clt-jwat-common';

@InputType()
export class CreateProductInput implements CreateProductDto {
  @Transform(({ value }) => value.trim())
  @IsString({ message: 'Name of product must be a string' })
  @IsNotEmpty({ message: "Product's name cannot be empty" })
  @Length(10, 200, { message: 'Name must be between 10 and 200 characters' })
  name: string;

  @Transform(({ value }) => value.trim())
  @IsString({ message: 'Make must be a string' })
  @IsNotEmpty({ message: 'Make cannot be empty' })
  @Length(10, 200, { message: 'Make must be between 10 and 200 characters' })
  make: string;

  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  category?: string;

  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  description?: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
