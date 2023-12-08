import { createEffect } from 'effector-next'
import { toast } from 'react-toastify'
import api from '../axiosClient'
import { AxiosError } from 'axios'
import { HTTPStatus } from '@/constans'
import { ISignInFx, ISignUpFx, IUser, IUserState } from '@/types/auth'
import { jwtDecode } from 'jwt-decode'
import { setUser, setUserState } from '@/context/user'

export const singUpFx = createEffect(
  async ({ url, name, password, email }: ISignUpFx) => {
    const { data } = await api.post(url, { name, password, email })

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
    const result = await api.post(url, { email, password })

    const userData: IUserState = await jwtDecode(result.data.accessToken)
    console.log('userData', userData)

    setUserState(userData)

    localStorage.setItem('auth', JSON.stringify(result.data))

    toast.success('Вход выполнен!')
    return result
  }
)

export const checkUserAuthFx = createEffect(async (token: string | any) => {
  try {
    const data = jwtDecode(token)

    const {
      userData: {
        userId,
        email,
        name,
        roles,
      },
      isLogged,
      isAdmin,
      isLoading,
      error,
    } = data as IUserState

    return {
      userData: {
        userId,
        email,
        name,
        roles,
      },
      isLogged,
      isAdmin,
      isLoading,
      error,
    }
  } catch (error) {
    const axiosError = error as AxiosError

    if (axiosError.response) {
      if (axiosError.response.status === HTTPStatus.FORBIDDEN) {
        return false
      }
    }

    //toast.error((error as Error).message)
  }
})

export const logoutFx = createEffect(async (url: string) => {
  try {
    await api.get(url)
  } catch (error) {
    toast.error((error as Error).message)
  }
})
