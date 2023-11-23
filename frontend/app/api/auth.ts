import { createEffect } from 'effector-next'
import { toast } from 'react-toastify'
import api from '../axiosClient'
import { AxiosError, AxiosResponse } from 'axios'
import { HTTPStatus } from '@/constans'
import { ISignInFx, ISignUpFx, IUser } from '@/types/auth'
import { jwtDecode } from 'jwt-decode'
import IAuthResponse from '@/types/IAuthResponse'

export const singUpFx = createEffect(
  async ({ url, name, password, email }: ISignUpFx) => {
    const { data } = await api.post<IAuthResponse>(url, { name, password, email })

  /*   if (data.warningMessage) {
      toast.warning(data.warningMessage)
      return
    } */

    toast.success('Регистрация прошла успешно!')

    return data
  }
)

export const singInFx = createEffect(
  async ({ url, email, password }: ISignInFx) => {
    const { data } = await api.post<IAuthResponse>(url, { email, password })

    toast.success('Вход выполнен!')

    localStorage.setItem('auth_connection', jwtDecode(data.accessToken));
    const dataToken = jwtDecode(data.accessToken);
    console.log('dataToken', dataToken);
    
    return data
  }
)

export const checkUserAuthFx = createEffect(async (token: string | any) => {
  try {
    const data = jwtDecode(token)

    const { email, userId, name } = data as IUser

    return { email, userId, name }
  } catch (error) {
    const axiosError = error as AxiosError

    if (axiosError.response) {
      if (axiosError.response.status === HTTPStatus.FORBIDDEN) {
        return false
      }
    }

    toast.error((error as Error).message)
  }
})

/* export const checkUserAuthFx = createEffect(async (url: string) => {
  try {
    const { data } = await api.get(url)

    return data
  } catch (error) {
    const axiosError = error as AxiosError

    if (axiosError.response) {
      if (axiosError.response.status === HTTPStatus.FORBIDDEN) {
        return false
      }
    }

    toast.error((error as Error).message)
  }
}) */

export const logoutFx = createEffect(async (url: string) => {
  try {
    await api.get(url)
  } catch (error) {
    toast.error((error as Error).message)
  }
})
