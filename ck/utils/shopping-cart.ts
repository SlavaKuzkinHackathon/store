import { toast } from 'react-toastify'
import {
  addToCartFx,
  removeFromCartFx,
  updateCartItemFx,
} from '@/app/api/shopping-cart'
import {
  removeShoppingCartItem,
  updateCartItemTotalPrice,
  updateShoppingCart,
} from '@/context/shopping-cart'

export const toggleCartItem = async (
  name: string,
  productId: number,
  isInCart: boolean
) => {
  try {
    if (isInCart) {
      await removeFromCartFx(`/shopping-cart/one/${productId}`)
      removeShoppingCartItem(productId)
      return
    }

    const data = await addToCartFx({
      url: '/shopping-cart/add',
      name,
      productId,
    })

    updateShoppingCart(data)
  } catch (error) {
    toast.error((error as Error).message)
    console.log("Вы не авторизованны для добавления товара");
  }
}

export const removeItemFromCart = async (productId: number) => {
  try {
    await removeFromCartFx(`/shopping-cart/one/${productId}`)
    removeShoppingCartItem(productId)
  } catch (error) {
    toast.error((error as Error).message)
    console.log("Вы не авторизованны для удаления товара");
  }
}

export const updateTotalPrice = async (total_price: number, productId: number) => {
  const data = await updateCartItemFx({
    url: `/shopping-cart/total-price/${productId}`,
    payload: { total_price },
  })

  updateCartItemTotalPrice({ productId, total_price: data.total_price })
}
