import { $mode } from '@/context/mode'
import { IOrderAccordionProps } from '@/types/order'
import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import styles from '@/styles/order/index.module.scss'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useState } from 'react'
import { $shoppingCart, $totalPrice } from '@/context/shopping-cart'
import CartPopupItem from '../Header/CartPopup/CartPopupItem'
import DoneSvg from '@/components/elements/DoneSvg/DoneSvg'
import EditSvg from '@/components/elements/EditSvg/EditSvg'
import OrderItem from './OrderItem'
import { formatPrice } from '@/utils/common'


const OrderAccordion = ({
  setOrderIsReady,
  showDoneIcon,
}: IOrderAccordionProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const isMobail550 = useMediaQuery(550)
  const [expanded, setExpanded] = useState(true)
  const shoppingCart = useStore($shoppingCart)
  const totalPrice = useStore($totalPrice)
  const toggleAccordion = () => setExpanded(!expanded)

  const openAccordion = () => {
    setOrderIsReady(false)
    setExpanded(true)
  }
  const closeAccordion = () => {
    setOrderIsReady(true)
    setExpanded(false)
  }

  return (
    <>
      <motion.div
        initial={false}
        className={`${styles.order__cart__title} ${darkModeClass}`}
      >
        <h3 className={`${styles.order__cart__title__text} ${darkModeClass}`}>
          {showDoneIcon && (
            <span>
              <DoneSvg />
            </span>
          )}
          Корзина
        </h3>
        <button
          className={`${styles.order__cart__title__btn} ${darkModeClass}`}
          onClick={openAccordion}
        >
          <span>
            <EditSvg />
          </span>
          {isMobail550 ? '' : 'Редактировать'}
        </button>
      </motion.div>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            style={{ overflow: 'hidden' }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className={`${styles.order__cart__content} ${darkModeClass}`}>
              <ul className={styles.order__cart__list}>
                {shoppingCart.length ? (
                  shoppingCart.map((item) =>
                    isMobail550 ? (
                      <CartPopupItem key={item.id} item={item} />
                    ) : (
                      <OrderItem item={item} key={item.id} />
                    )
                  )
                ) : (
                  <li className={styles.order__cart__empty}>
                    <span
                      className={`${styles.order__cart__empty__text} ${darkModeClass}`}
                    >
                      Корзина пуста
                    </span>
                  </li>
                )}
              </ul>
              <div className={styles.order__cart__footer}>
                <div className={styles.order__cart__footer__total}>
                <span
                      className={`${styles.order__cart__footer__text} ${darkModeClass}`}
                    >
                      Общая сумма заказа:
                    </span>
                    <span className={styles.order__cart__footer__price}>{formatPrice(totalPrice)} ₽</span>
                </div>
                <button
                className={styles.order__cart__footer__btn}
                onClick={closeAccordion}
                disabled={!shoppingCart.length}
                >Продолжить</button>
              </div>  
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default OrderAccordion
