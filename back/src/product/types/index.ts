import { Op } from 'sequelize';
import { ApiProperty } from '@nestjs/swagger';

class Products {
  id: number;
  name: string;
  description: string;
   price: string;
  images: string;
  in_stock: number;
  rating: number;
  createdAt: string;
}

export class PaginateAndFilterResponse {
  count: number;
  rows: Products;
}

export class Bestsellers extends Products {
  rating: number;
}

export class GetBestsellersResponse extends PaginateAndFilterResponse {
  count: number;
  rows: Bestsellers;
}

export class GetNewResponse extends PaginateAndFilterResponse {
 count: number;
}

export class SearchByLetterResponse extends Products {
  name: string;
}

export class SearchResponse extends PaginateAndFilterResponse {
  rows: SearchByLetterResponse;
}

export class SearchRequest {
  search: string;
}

export class GetByNameResponse extends Products {
  name: string;
}

export class GetByNameRequest {
  name: string;
}

export class FindOneResponse extends Products {}

export interface IDivansQuery {
  limit: string;
  offset: string;
  divans: string | undefined;
  priceFrom: string | undefined;
  priceTo: string | undefined; 
}

export interface IDivansFilter {
  divans_manufacturer: string | undefined;
  price: { [Op.between]: number[] };
}