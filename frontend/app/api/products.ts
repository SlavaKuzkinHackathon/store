import { createEffect } from 'effector-next'
import api from '../axiosClient'
import { HTTPStatus } from '@/constans'
import { AxiosError } from 'axios'
import { ICreateProduct } from '@/types/products'

export const getProductsFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})

export const createProductFx = createEffect(async ({ url, product }: ICreateProduct) => {
  try {
    const { data } = await api.post(url, { ...product });

    return data;
  } catch (error) {
    const axiosError = error as AxiosError

    if (axiosError.response) {
      if (axiosError.response.status === HTTPStatus.FORBIDDEN) {
        return false
      }
    }

  }
});