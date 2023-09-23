import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import { RemoveFromCartFx } from '../app/api/shoping-cart'
import { removeItemFromCart, updateTotalPrice } from '@/utils/shoping-cart'

export const usePrice = (
  count: number,
  divansId: number,
  initialPrice: number
) => {
  const spinner = useStore(RemoveFromCartFx.pending)
  const [price, setPrice] = useState(initialPrice)

  useEffect(() => {
    setPrice(price * count)
  }, [])

  useEffect(() => {
    updateTotalPrice(price, divansId)
  }, [price])

  const increasePrice = () => setPrice(price + initialPrice)
  const decreasePrice = () => setPrice(price - initialPrice)
  const deleteCartItem = () => removeItemFromCart(divansId)

  return { price, spinner, increasePrice, decreasePrice, deleteCartItem }
}