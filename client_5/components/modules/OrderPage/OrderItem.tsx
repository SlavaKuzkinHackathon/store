/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { IShopingCartItem } from '../../../types/shoping-cart'
import { usePrice } from '../../../hooks/usePrice'
import { useMediaQuery } from "../../../hooks/useMediaQuery"
import CartItemCounter from '../../Elements/CartItemCounter/CartItemCounter'
import { formatPrice } from '@/utils/common'
import spinnerStyles from '../../../src/styles/spinner/spinner.module.css'
import styles from '../../../src/styles/order/index.module.scss'

const OrderItem = ({ item }: { item: IShopingCartItem }) => {
  const isMedia1160 = useMediaQuery(1160)
  const { price, spinner, decreasePrice, deleteCartItem, increasePrice } =
    usePrice(item.count, item.divansId, item.price)

  return (
    <li className={styles.order__cart__list__item}>
      <div className={styles.order__cart__list__item__left}>
        <div className={styles.order__cart__list__item__left__inner}>
          <div className={styles.order__cart__list__item__img}>
            <img src={item.image} alt={item.name} />
          </div>
          <Link href={`/catalog/${item.divansId}`} passHref legacyBehavior>
            <a
              className={styles.order__cart__list__item__text}
            >
              <span>
                {item.name.replace('.', '')}, {item.divans_manufacturer},{' '}
              </span>
            </a>
          </Link>
        </div>
        {isMedia1160 &&
          (item.in_stock === 0 ? (
            <span className={styles.order__cart__list__item__empty}>
              Нет на складе
            </span>
          ) : (
            <CartItemCounter
              totalCount={item.in_stock}
              divansId={item.divansId}
              initialCount={item.count}
              increasePrice={increasePrice}
              decreasePrice={decreasePrice}
            />
          ))}
      </div>
      <div className={styles.order__cart__list__item__right}>
        {!isMedia1160 &&
          (item.in_stock === 0 ? (
            <span className={styles.order__cart__list__item__empty}>
              Нет на складе
            </span>
          ) : (
            <CartItemCounter
              totalCount={item.in_stock}
              divansId={item.divansId}
              initialCount={item.count}
              increasePrice={increasePrice}
              decreasePrice={decreasePrice}
            />
          ))}
        <span
          className={styles.order__cart__list__item__price}
        >
          {formatPrice(price)} ₽
        </span>
        <button
          className={styles.order__cart__list__item__delete}
          onClick={deleteCartItem}
        >
          {spinner ? (
            <span
              className={spinnerStyles.spinner}
              style={{ top: '-13px', left: '-30px', width: 25, height: 25 }}
            />
          ) : (
            'Удалить'
          )}
        </button>
      </div>
    </li>
  )
}

export default OrderItem