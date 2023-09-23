
import { createDomain } from 'effector-next'
import { IShopingCartItem } from '../types/shoping-cart'

const shoppingCart = createDomain()

export const setShopingCart = shoppingCart.createEvent<IShopingCartItem[]>()
export const updateShopingCart = shoppingCart.createEvent<IShopingCartItem>()
export const removeShopingCartItem = shoppingCart.createEvent<number>()
export const setTotalPrice = shoppingCart.createEvent<number>()
export const setDisableCart = shoppingCart.createEvent<boolean>()
export const updateCartItemTotalPrice = shoppingCart.createEvent<{
    divansId: number,
    total_price: number
}>()

export const updateCartItemCount = shoppingCart.createEvent<{
    divansId: number,
    count: number
}>()


const remove = (
    cartItems: IShopingCartItem[],
    divansId: number) => cartItems.filter((item) => item.divansId !== divansId)

function updateCartItem<T>(cartItems: IShopingCartItem[],
    divansId: number,
    payload: T) {
    return cartItems.map((item) => {
        if (item.divansId === divansId) {
            return {
                ...item,
                ...payload
            }
        }

        return item
    })
}



export const $shopingCart = shoppingCart
    .createStore<IShopingCartItem[]>([])
    .on(setShopingCart, (_, shoppingCart) => shoppingCart)
    .on(updateShopingCart, (state, cartItem) => [...state, cartItem])
    .on(removeShopingCartItem, (state, divansId) => [...remove(state, divansId)])
    .on(updateCartItemTotalPrice, (state, { divansId, total_price }) => [
        ...updateCartItem(state, divansId, { total_price })])
    .on(updateCartItemCount, (state, { divansId, count }) => [
        ...updateCartItem(state, divansId, { count })])


export const $totalPrice = shoppingCart
    .createStore<number>(0)
    .on(setTotalPrice, (_, value) => value)

export const $disableCart = shoppingCart
    .createStore<boolean>(false)
    .on(setDisableCart, (_, value) => value)   