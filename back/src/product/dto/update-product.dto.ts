import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    example: 'Наименования товара...',
    description: 'Наименования товара',
  })
  readonly name: string;

  @ApiProperty({
    example: 1000,
    description: 'Цена товара',
  })
  readonly price: number;

  @ApiProperty({
    example: 1000,
    description: 'Количество товара',
  })
  readonly in_stock: number;

  @ApiProperty({
    example: '{title:"Название характаристики", description:"Описание"}',
    description: 'Характеристики товара',
  })
  readonly info: string;
}
