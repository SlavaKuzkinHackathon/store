import { useState } from 'react'
import styles from '../../../src/styles/shippingPayment/index.module.scss'
import { motion } from 'framer-motion'
import { tab1Text, tab2Text, tab3Text, tab4Text } from '../../../src/utils/shopingPayment'
const ShipingPayment = () => {

  const [tab1, setTab1] = useState(true)
  const [tab2, setTab2] = useState(false)
  const [tab3, setTab3] = useState(false)
  const [tab4, setTab4] = useState(false)

  const handleTab1 = () => {
    setTab1(true)
    setTab2(false)
    setTab3(false)
    setTab4(false)
  }

  const handleTab2 = () => {
    setTab1(false)
    setTab2(true)
    setTab3(false)
    setTab4(false)
  }

  const handleTab3 = () => {
    setTab1(false)
    setTab2(false)
    setTab3(true)
    setTab4(false)
  }

  const handleTab4 = () => {
    setTab1(false)
    setTab2(false)
    setTab3(false)
    setTab4(true)
  }
  return (
    <section className={styles.shipping_payment}>
      <div className='container'>
        <h2 className={styles.shipping_payment__title}>Доставка и оплата</h2>
      </div>
      <div className={styles.shipping_payment__tabs}>
        <ul className={styles.shipping_payment__tabs__controls}>
          <li className={`${styles.shipping_payment__tabs__controls__item} ${tab1 ? styles.active : ''
            }`}>
            <button onClick={handleTab1}>
              Как работает курьерская доставка
            </button>
          </li>
          <li
            className={`${styles.shipping_payment__tabs__controls__item} ${tab2 ? styles.active : ''
              } `}
          >
            <button onClick={handleTab2}>
              Как получить товар из пункта самовывоза?
            </button>
          </li>
          <li
            className={`${styles.shipping_payment__tabs__controls__item} ${tab3 ? styles.active : ''
              }`}
          >
            <button onClick={handleTab3}>
              Какие способы оплаты?
            </button>
          </li>
          <li
            className={`${styles.shipping_payment__tabs__controls__item} ${tab4 ? styles.active : ''
              } `}
          >
            <button onClick={handleTab4}>
              Как узнать статус заказанного товара?
            </button>
          </li>
        </ul>
        <div
          className={`${styles.shipping_payment__tabs__content}`}
        >
          {tab1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.shipping_payment__tabs__content__text}
            >
              {tab1Text}
            </motion.div>
          )}
          {tab2 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.shipping_payment__tabs__content__text}
            >
              {tab2Text}
            </motion.p>
          )}
          {tab3 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.shipping_payment__tabs__content__text}
            >
              {tab3Text}
            </motion.p>
          )}
          {tab4 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.shipping_payment__tabs__content__text}
            >
              {tab4Text}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  )
}

export default ShipingPayment