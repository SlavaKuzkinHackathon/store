import { createEffect } from 'effector-next'
import { toast } from 'react-toastify'
import api from '../axiosClient'
import { AxiosError } from 'axios'
import { HTTPStatus } from '@/constans'
import { ISignInFx, ISignUpFx, IUser } from '@/types/auth'
import { jwtDecode } from 'jwt-decode'

export const singUpFx = createEffect(
  async ({ url, username, password, email }: ISignUpFx) => {
    const { data } = await api.post(url, { username, password, email })

    if (data.warningMessage) {
      toast.warning(data.warningMessage)
      return
    }

    toast.success('Регистрация прошла успешно!')

    return data
  }
)

export const singInFx = createEffect(
  async ({ url, email, password }: ISignInFx) => {
    const { data } = await api.post(url, { email, password })

    const userData: IUser = await jwtDecode(data.accessToken)
    /*.log('userData', userData) */

    toast.success('Вход выполнен!')

    localStorage.setItem('auth', JSON.stringify(userData))

    return userData
  }
)

export const checkUserAuthFx = createEffect(async (url: string) => {
  try {
    const { data } = await api.get(url)
    const userData: IUser = await jwtDecode(data.accessToken)
    localStorage.setItem('auth_connect', JSON.stringify(userData))

    return data
  } catch (error) {
    const axiosError = error as AxiosError

    if (axiosError.response) {
      if (axiosError.response.status === HTTPStatus.FORBIDDEN) {
        return false
      }
    }

    // toast.error((error as Error).message)
  }
})

export const logoutFx = createEffect(async (url: string) => {
  try {
    await api.get(url)
  } catch (error) {
    toast.error((error as Error).message)
  }
})
