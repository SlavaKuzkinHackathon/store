import {
    Column,
    Model,
    Table,
    DataType,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
  import { Product } from './product.model';
import { ApiProperty } from '@nestjs/swagger';
  
  export interface ProductImageCreationAttrs {
    image: string;
    productId: number;
  }
  
  @Table({ tableName: 'prodImage', createdAt: false, updatedAt: false })
  export class ProductImage extends Model<ProductImage, ProductImageCreationAttrs> {
    @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    })
    id: number;
  
    @ApiProperty({
      example: '91643f20-bf90-4ad6-a339-21460da42107.jpg',
      description: 'Наименование изображения товара',
    })
    @Column({ type: DataType.STRING,  allowNull: false})
    image: string;
  
    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER })
    productId: number;
  
    @BelongsTo(() => Product)
    product: Product;
  }