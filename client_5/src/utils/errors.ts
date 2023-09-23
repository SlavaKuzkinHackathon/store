import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { HTTPStatus } from '../../constans'

export const showAuthError = (error: unknown) => {
    const axionsError = error as AxiosError

    if (axionsError.response) {
        if (axionsError.response.status === HTTPStatus.UNAUTHORIZED) {
            toast.error('Неверное имя пользователя или пароль')
            return
        }
    }
    toast.error((error as Error).message)
}