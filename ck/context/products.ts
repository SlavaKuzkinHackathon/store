import { IProducts, IProduct } from '@/types/product'
import { createDomain } from 'effector-next'

const products = createDomain()
//export const setProducts = products.createEvent<IProducts[]>()
export const setProducts = products.createEvent<IProducts>()
//export const createProduct = products.createEvent<IProducts>()

export const $products = products
  .createStore<IProducts>({} as IProducts)
  .on(setProducts, (_, products) => products)



/* export const $products = products
  .createStore<IProducts[]>([])
  .on(setProducts, (_, products) => products)
  .on(createProduct, (state, product) => [...state, product]) */