import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { SearchProductDto } from 'clt-jwat-common';

@InputType()
export class SearchProductInput implements SearchProductDto {
  @Field({ nullable: true })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  category?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  make?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  quantity?: number;
}
