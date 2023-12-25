import { IProducts, IProduct } from '@/types/products'
import { createDomain } from 'effector-next'

const products = createDomain()
export const setProducts = products.createEvent<IProducts[]>()
export const $products = products
  .createStore<IProducts[]>([])
  .on(setProducts, (_, products) => products)