import { createEffect } from 'effector-next'
import api from '../axiosClient'
import { IProduct, ProductSchema } from '@/types/product'
import {
  axiosInstance,
  ListDTO,
  PaginationQueryDTO,
  createListResponseSchema,
  createResponseSchema,
} from './lib';

export const getProductsFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})

const BASE_ROUTE = '/products';

const ProductResponseSchema = createResponseSchema(ProductSchema)
const ProductListSchema = createListResponseSchema(ProductSchema);

export type CreateProductDTO = {
  name: string;
  description: string;
  price: number;
  in_stock: number;
  rating: number;
  image: string;
};

export const createProduct = async (
  data: CreateProductDTO,
): Promise<IProduct> => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('price', data.price.toString());
  formData.append('rating', data.rating.toString());
  formData.append('in_stock', data.in_stock.toString());

  for (const image of data.image) {
    formData.append('image', image);
  }

  const response = await api.post(`${BASE_ROUTE}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });


  return ProductResponseSchema.parse(response.data).data;
};


export const fetchProduct = async (productId: number): Promise<IProduct> => {
  const response = await axiosInstance.get(`${BASE_ROUTE}/${productId}`);
  return ProductResponseSchema.parse(response.data).data;
};

export const fetchProducts = async (
  query: PaginationQueryDTO & {
    searchQuery: string;
  },
): Promise<ListDTO<IProduct>> => {
  const response = await axiosInstance.get(`${BASE_ROUTE}`, { params: query });

  return ProductListSchema.parse(response.data).data;
};

export const fetchRecommendedProducts = async (
  query: PaginationQueryDTO & { productId: number },
): Promise<ListDTO<IProduct>> => {
  const response = await axiosInstance.get(`${BASE_ROUTE}/recommended`, {
    params: query,
  });

  return ProductListSchema.parse(response.data).data;
};

export const deleteProduct = async (productId: number): Promise<void> => {
  await axiosInstance.delete(`${BASE_ROUTE}/${productId}`);
};