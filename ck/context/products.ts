import { IFilterCheckboxItem } from '@/types/catalog'
import { IProducts, IProduct } from '@/types/product'
import { productModels } from '@/utils/catalog'
import { createDomain } from 'effector-next'

const products = createDomain()

export const setProductsm = products.createEvent<IProducts>()

export const setProductsmCheapFirst = products.createEvent()
export const setProductsmExpensiveFirst = products.createEvent()
export const setProductsmByPopularity = products.createEvent()

export const setProductsmModels = products.createEvent<IFilterCheckboxItem[]>()


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


  export const $productsmModels = products
  .createStore<IFilterCheckboxItem[]>(productModels as IFilterCheckboxItem[])
  .on(setProductsmModels, (_, productsm) => productsm)