import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({ example: 'Ivan' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  userId?: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  readonly productId: number;
}