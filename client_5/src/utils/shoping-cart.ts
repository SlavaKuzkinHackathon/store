import { toast } from "react-toastify"
import { AddToCartFx, RemoveFromCartFx, updateCartItemFx } from "../../app/api/shoping-cart"
import { removeShopingCartItem, updateCartItemTotalPrice, updateShopingCart } from "../../context/shopping-cart"

export const toggleCartItem = async (
    username: string,
    divansId: number,
    isInCart: boolean,
) => {
    try {
        if (isInCart) {
            await RemoveFromCartFx(`/cart/one/${divansId}`)
            removeShopingCartItem(divansId)
            return
        }

        const data = await AddToCartFx({
            url: '/cart/add',
            username,
            divansId,
        })

        updateShopingCart(data)
    } catch (error) {
        toast.error((error as Error).message)
    }
}

export const removeItemFromCart = async (divansId: number) => {
    try {
        await RemoveFromCartFx(`/cart/one/${divansId}`)
        removeShopingCartItem(divansId)
    } catch (error) {
        toast.error((error as Error).message)
    }
}

export const updateTotalPrice = async (total_price: number, divansId: number) => {
    const data = await updateCartItemFx({
      url: `/cart/total-price/${divansId}`,
      payload: { total_price }
    })
  
    updateCartItemTotalPrice({ divansId, total_price: data.total_price })
  }