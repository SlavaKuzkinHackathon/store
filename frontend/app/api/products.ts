import { createEffect } from 'effector-next'
import api from '../axiosClient'
import { toast } from 'react-toastify'

export const getProductsFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})

