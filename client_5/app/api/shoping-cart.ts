import { createEffect } from "effector-next"
import api from "../axios.client";
import { IAddToCartFx, IUpdateCartItemFx } from "../../types/shoping-cart";

export const GetCartItemFx = createEffect(async (url: string) => {
    const { data } = await api.get(url)

    return data
})

export const AddToCartFx = createEffect(
    async ({ url, username,
        divansId }: IAddToCartFx) => {
        const { data } = await api.post(url, { username, divansId })

        return data
    })

export const RemoveFromCartFx = createEffect(
    async (url: string
    ) => {
        await api.delete(url)
    })


export const updateCartItemFx = createEffect(
    async ({ url, payload }: IUpdateCartItemFx) => {
        const { data } = await api.patch(url, payload)

        return data
    }
)    