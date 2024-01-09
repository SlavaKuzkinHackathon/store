import { productUpdated } from '@/components/elements/UpdateProduct/index.model'
import { IProduct } from '@/types/product'
//import { IProducts, IProduct } from '@/types/products'
import { createDomain, sample } from 'effector-next'

const products = createDomain()
export const setProducts = products.createEvent<IProduct[]>()
export const createProduct = products.createEvent<IProduct>()


export const $products = products
  .createStore<IProduct[]>([])
  .on(setProducts, (_, products) => products)
  .on(createProduct, (state, product) => [...state, product])

  sample({
    clock:[
      productUpdated
    ]
  })