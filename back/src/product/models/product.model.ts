import {
  Column,
  Model,
  Table,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import { ProductInfo } from './product-info.model';
import { ApiProperty } from '@nestjs/swagger';

interface ProductCreationAttrs {
  name: string;
  price: number;
  image: string;
  catalogId: number;
}

@Table({ tableName: 'products', updatedAt: false })
export class Product extends Model<Product, ProductCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Идентификатор товара' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @ApiProperty({ example: 'Диван', description: 'Наименование товара' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({ example: 1000, description: 'Цена товара' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @ApiProperty({
    example: '91643f20-bf90-4ad6-a339-21460da42107.jpg',
    description: 'Наименование изображения товара',
  })
  @Column({ type: DataType.STRING })
  image: string;

  @ApiProperty({ example: 5, description: 'Рейтинг товара' })
  @Column({ type: DataType.FLOAT, allowNull: false, defaultValue: 0 })
  rating: number;

  @HasMany(() => ProductInfo, { onDelete: 'CASCADE' })
  productInfo: ProductInfo[];
}
