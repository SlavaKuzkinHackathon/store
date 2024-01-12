import { createEffect, createEvent, createStore, sample } from 'effector'
import * as productsApi from '@/app/api/products'
import { ApiError } from '@/app/api/lib'
import { toast } from 'react-toastify'

// Effects
export const updateProductFx = createEffect<
  productsApi.UpdateProductDTO,
  void,
  ApiError
>(async (product: productsApi.UpdateProductDTO,) => {
  await productsApi.updateProduct(product)
})

// Events
export const updateProduct =
  createEvent<productsApi.UpdateProductDTO>('Update product')
export const productUpdated = updateProductFx.done

// Stores

sample({
  clock: updateProduct,
  target: updateProductFx,
})

updateProductFx.failData.watch((e) => toast.error(e.message))
