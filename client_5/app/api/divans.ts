import { createEffect } from "effector-next";
import api from "../axios.client";

export const getDivansOrNewFx = createEffect(async (url: string) => {
    const {data} = await api.get(url)

    return data
})

export const getDivansFx = createEffect(async (url: string) => {
    const {data} = await api.get(url)

    return data
})

export const getDivanFx = createEffect(async (url: string) => {
    const {data} = await api.get(url)

    return data
})