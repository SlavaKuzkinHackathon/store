import { IShoppingCartItem } from "@/types/shoping-cart";
import { createDomain } from "effector-next";

const shoppingCart = createDomain()

export const setShoppingCart = shoppingCart.createEvent<IShoppingCartItem[]>()

export const  $shoppingCart = shoppingCart.createStore<IShoppingCartItem[]>([])
.on(setShoppingCart , (_, shoppingCart) => shoppingCart)