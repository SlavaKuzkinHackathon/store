import { IProducts, IProduct } from '@/types/products'
import { createDomain } from 'effector-next'

const product = createDomain()
export const createProduct = product.createEvent<IProduct>()


export const $product = product
  .createStore<IProduct>({} as IProduct)
  .on(createProduct, (_, product) => product)