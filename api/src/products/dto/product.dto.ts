import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ProductDTO {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsInt()
  price: number;

  @ApiProperty()
  @IsInt()
  in_stock: number;

  @ApiProperty()
  @IsInt()
  rating: number;

  @ApiProperty()
  @IsString()
  thumbUrl: string;

  @ApiProperty()
  @IsArray({ each: true })
  @ValidateNested({ each: true })
  @IsString()
  images: string[];
}
