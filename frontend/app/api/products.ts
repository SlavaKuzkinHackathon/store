import { createEffect } from 'effector-next'
import api from '../axiosClient'

export const getProductsFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})

