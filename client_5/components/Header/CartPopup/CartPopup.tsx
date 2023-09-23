import { forwardRef, useEffect } from "react";
import ShoppingCartSvg from "../../Elements/ShopingCartSvg/ShopingCartSvg";
import { $disableCart, $shopingCart, $totalPrice, setShopingCart, setTotalPrice } from "../../../context/shopping-cart";
import { useStore } from "effector-react";
import Link from "next/link";
import { IWrappedComponentProps } from "../../../types/common"
import { AnimatePresence, motion } from "framer-motion";
import { withClickOutside } from "@/utils/withClickOutside";
import styles from '../../../src/styles/cartPopup/index.module.css'
import CartPopupItem from "./CartPopupItem";
import { GetCartItemFx } from "../../../app/api/shoping-cart";
import { $user } from "../../../context/user";
import { toast } from "react-toastify";
import { formatPrice } from "@/utils/common";

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {

    const shopingCart = useStore($shopingCart)
    const disableCart = useStore($disableCart)
    const user = useStore($user)
    const totalPrice = useStore($totalPrice)
    const toggleCartDropDown = () => setOpen(!open)

    useEffect(() => {
      loadCartItems()
    }, [])

    useEffect(() => {
      setTotalPrice(
        shopingCart.reduce(
          (defaultCount, item) => defaultCount + item.total_price,
          0)
      )
    }, [shopingCart])

    const loadCartItems = async () => {
      try {
        const cartItems = await GetCartItemFx(`/cart/${user.userId}`)
        setShopingCart(cartItems)
      } catch (error) {
        toast.error((error as Error).message)
      }
    }


    return (
      <div className={styles.cart} ref={ref} >
        {disableCart ? (<button className={styles.cart__btn}
          style={{ cursor: "auto" }}
        >
          <span className={styles.cart__svg}>
            <ShoppingCartSvg /></span>
        </button>) :
          (
            <button
              className={styles.cart__btn}
              onClick={toggleCartDropDown}>
              {!!shopingCart.length &&
                <span className={styles.cart__btn__count}>
                  {shopingCart.length}
                </span>}
              <span className={styles.cart__svg}>
                <ShoppingCartSvg />
              </span>
            </button>
          )}
        <AnimatePresence>
          {open && <motion.ul
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className={styles.cart__popup}
            style={{ transformOrigin: 'rigth top' }}
          >
            <h3 className={styles.cart__popup__title}>Корзина</h3>
            <ul className={styles.cart__popup__list}>
              {shopingCart.length ? (
                shopingCart.map((item) => <CartPopupItem key={item.id} item={item} />)
              ) : (
                <li className={styles.cart__popup__empty}>
                  <span className={styles.cart__popup__empty__text}>
                    Корзина пуста
                  </span>
                </li>)}
            </ul>

            <div className={styles.cart__popup__footer}>
              <div className={styles.cart__popup__footer__total}>
                <span
                  className={styles.cart__popup__footer__text}
                >
                  Обшая сумма заказа:
                </span>
                <span
                  className={styles.cart__popup__footer__price}
                >
                  {formatPrice(totalPrice)} ₽
                </span>
              </div>
              <Link href={"/order"} passHref legacyBehavior>
                <button
                  className={styles.cart__popup__footer__btn}
                  disabled={!shopingCart.length}>
                  Оформить заказ
                </button>
              </Link>
            </div>
          </motion.ul>}
        </AnimatePresence>
      </div>
    )
  }
)

CartPopup.displayName = 'CartPopup'

export default withClickOutside(CartPopup)
