import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCatalogDto {
  @ApiProperty({
    example: 'Диван угловой',
    description: 'Название каталога',
  })
  @IsNotEmpty({ message: 'Нет наименования товара' })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;
}
