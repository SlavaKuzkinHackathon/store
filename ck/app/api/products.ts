import { createEffect } from 'effector-next'
import api from '../axiosClient'
import { IProduct, ProductSchema } from '@/types/product'
import { createResponseSchema } from './lib'

export const getProductsFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})

const BASE_ROUTE = '/products'

const ProductResponseSchema = createResponseSchema(ProductSchema)

export type CreateProductDTO = {
  name: string
  description: string
  price: number
  in_stock: number
  rating: number
  image: string
}

//CREATE

export const createProduct = async (
  data: CreateProductDTO
): Promise<IProduct> => {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('description', data.description)
  formData.append('price', data.price.toString())
  formData.append('rating', data.rating.toString())
  formData.append('in_stock', data.in_stock.toString())

  for (const image of data.image) {
    formData.append('image', image)
  }

  const response = await api.post(`${BASE_ROUTE}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return ProductResponseSchema.parse(response.data).data
}

//UPDATE
export type UpdateProductDTO = {
  id: number
} & Partial<{
  name: string
  description: string
  price: number
  in_stock: number
  rating: number
  image: Blob
}>

export const updateProduct = async (
  product: UpdateProductDTO
): Promise<IProduct> => {
  const formData = new FormData()
  formData.append('id', product.id.toString())
  if (product.name) {
    formData.append('name', product.name)
  }
  if (product.description) {
    formData.append('description', product.description)
  }
  if (product.price) {
    formData.append('price', product.price.toString())
  }
  if (product.in_stock) {
    formData.append('in_stock', product.in_stock.toString())
  }
  if (product.rating) {
    formData.append('rating', product.rating.toString())
  }
  if (product.image) {
    formData.append('image', product.image)
  }

  const response = await api.put(`${BASE_ROUTE}/${product.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return ProductResponseSchema.parse(response.data).data
}

// DELETE

export const deleteProduct = async (productId: number): Promise<void> => {
  await api.delete(`${BASE_ROUTE}/${productId}`)
}

