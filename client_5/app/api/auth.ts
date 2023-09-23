import { createEffect } from "effector-next";
import { ISignInFx, ISignUpFx } from "../../types/auth_f";
import api from "../axios.client";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { HTTPStatus } from "../../constans";

export const signUpFx = createEffect(async ({ url, username, password, email }: ISignUpFx) => {
    const { data } = await api.post(url, { username, email, password })

    if (data.warningMessage) {
        toast.warning(data.warningMessage)
        return
    }
    toast.success('Регистрация прошла успешно!')

    return data

})

export const signInFx = createEffect(async ({ url, username, password }: ISignInFx) => {
    const { data } = await api.post(url, { username, password })

    toast.success('Вход выполнен!')

    return data
})


export const checkUserAuthFx = createEffect(async (url: string) => {
    try {
        const { data } = await api.get(url)
        return data
    } catch (error) {
        const axiosError = error as AxiosError

        if (axiosError.response) {
            if (axiosError.response.status === HTTPStatus.FORBIDDEN)
                return false
        }
        toast.error((error as Error).message)
    }

})

export const logoutFx = createEffect(async (url: string) => {
    try {
      await api.get(url)
    } catch (error) { }

})