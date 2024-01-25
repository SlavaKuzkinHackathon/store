import { ApiProperty } from '@nestjs/swagger';
import { Op } from 'sequelize';
import { Product } from '../models/product.model';



export class PaginateAndFilterResponse {
    @ApiProperty({ example: 10 })
    count: number;
  
    @ApiProperty({ type: Product, isArray: true })
    rows: Product;
  }


export interface IProductsQuery {
    limit: string;
    offset: string;
    products: string | undefined;
    priceFrom: string | undefined;
    priceTo: string | undefined; 
  }
  
  export interface IProductsFilter {
    model: string | undefined;
    price: { [Op.between]: number[] };
  }