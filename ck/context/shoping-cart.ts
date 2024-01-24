import { IShopingCartItem } from "@/types/shoping-cart";
import { createDomain } from "effector-next";

const shopingCart = createDomain()

export const setShopingCart = shopingCart.createEvent<IShopingCartItem[]>()

export const  $shopingCart = shopingCart.createStore<IShopingCartItem[]>([])
.on(setShopingCart , (_, shopingCart) => shopingCart)