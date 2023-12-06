
import { createEffect } from 'effector-next'
import { toast } from 'react-toastify'
import api from '../axiosClient'
import { AxiosError } from 'axios'
import { HTTPStatus } from '@/constans'
import { ISignInFx, ISignUpFx, IUser } from '@/types/auth'
import { jwtDecode } from 'jwt-decode'
import { setUser} from '@/context/user'

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

    const userData: IUser = await jwtDecode(result.data.accessToken)
    setUser(userData)

    localStorage.setItem('auth', JSON.stringify(result.data))

    toast.success('Вход выполнен!')
    return result
  }
)

export const checkUserAuthFx = createEffect(async (token: string | any ) => {
  try {

    const data = jwtDecode(token);

		const { email, userId, name, roles } = data as IUser;

		return { email, userId, name, roles };


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


