import { IProducts, IProduct } from '@/types/product'
import { createDomain } from 'effector-next'

const products = createDomain()

export const setProductsm = products.createEvent<IProducts>()

export const setProductsmCheapFirst = products.createEvent()
export const setProductsmExpensiveFirst = products.createEvent()
export const setProductsmByPopularity = products.createEvent()


export const $productsm = products
  .createStore<IProducts>({} as IProducts)
  .on(setProductsm, (_, productsm) => productsm)
  .on(setProductsmCheapFirst,(state) => ({
    ...state,
    rows: state.rows.sort((a, b) => a.price - b.price)
  }))
  .on(setProductsmExpensiveFirst,(state) => ({
    ...state,
    rows: state.rows.sort((a, b) => b.price - a.price)
  }))
  .on(setProductsmByPopularity,(state) =>({
    ...state,
    rows: state.rows.sort((a, b) => b.rating - a.rating)
  }))




  //export const createProduct = products.createEvent<IProducts>()
/* 
export const $products = products
.createStore<IProducts[]>([])
.on(setProducts, (_, products) => products)
.on(createProduct, (state, product) => [...state, product]) */

//export const setProducts = products.createEvent<IProducts[]>()