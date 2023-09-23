import { createEffect } from "effector-next";
import { IGeolacation } from "../../types/common";
import api from "../axios.client";


export const getGeolacationFx = createEffect(async ({ latitude, longitude }: IGeolacation) => {
    const data = await api.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&lang=ru&apiKey=${process.env.NEXT_PUBLIC_GEPAPI_KEY}`,
        { withCredentials: false }
    )
    return data
})