import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString,} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Наименования товара',
    description: 'Наименования товара',
  })
  @IsNotEmpty({ message: 'Нет наименования товара' })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;

  @ApiProperty({
    example: 1000,
    description: 'Цена товара',
  })
  @IsNotEmpty({ message: 'Нет цены товара' })
  readonly price: number;

  @ApiProperty({
    example: 20,
    description: 'Количество товара',
  })
  @IsNotEmpty({ message: 'Не указано количество товара' })
  readonly in_stock: number;

  @ApiProperty({
    example: '{title:"Название характаристики", description:"Описание"}',
    description: 'Характеристики товара',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly info: string;
}
