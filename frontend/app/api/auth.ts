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
    const result = await api.post(url, { email, password })
    console.log('result' , result);
    

    toast.success('Вход выполнен!')

    /*  localStorage.setItem('auth_connection', jwtDecode(data.accessToken))
    localStorage.setItem('auth', JSON.stringify(data.result));
    //const dataToken = jwtDecode(data.accessToken)
    //console.log('dataToken', dataToken)
    console.log('auth_connection', jwtDecode(data.accessToken)) */
    //localStorage.setItem('auth_connection', jwtDecode(data.accessToken))
    // localStorage.setItem("token", data.token);
/*     setAuth(true);
    setUsername(result.data.email) */
    localStorage.setItem('auth', JSON.stringify(result.data))
    console.log('auth', JSON.stringify(result.data))

    return result
  }
)

export const checkUserAuthFx = createEffect(
  async (url: string, token: string | any) => {
    try {
      //const { data } = await api.get(url)
      const data = jwtDecode(token)

      const { email, userId, name, roles } = data as IUser

      return { email, userId, name, roles }
      //return data
    } catch (error) {
      const axiosError = error as AxiosError

      if (axiosError.response) {
        if (axiosError.response.status === HTTPStatus.FORBIDDEN) {
          return false
        }
      }

      //toast.error((error as Error).message)
    }
  }
)

export const logoutFx = createEffect(async (url: string) => {
  try {
    await api.get(url)
  } catch (error) {
    toast.error((error as Error).message)
  }
})
