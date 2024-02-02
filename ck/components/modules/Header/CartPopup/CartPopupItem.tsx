import DeleteSvg from '@/components/elements/DeleteSvg/DeleteSvg'
import { $mode } from '@/context/mode'
import styles from '@/styles/cartPopup/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { IShoppingCartItem } from '@/types/shopping-cart'
import { formatPrice } from '@/utils/common'
import { getImageURL } from '@/utils/getImageURL'
import { removeItemFromCart } from '@/utils/shopping-cart'
import { useStore } from 'effector-react'
import Link from 'next/link'
import { useState } from 'react'

const CartPopupItem = ({ item }: { item: IShoppingCartItem }) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const spinnerDarkModeClass =
    mode === 'dark' ? `${spinnerStyles.dark_mode}` : ''

  const [spinner, setSpinner] = useState(false)

  const deleteCartItem = () => removeItemFromCart(item.productId, )


  return (
    <li className={styles.cart__popup__list__item}>
      <div className={styles.cart__popup__list__item__top}>
        <div className={styles.cart__popup__list__item__img}>
          <img src={getImageURL(item.image)} alt={item.name} />
        </div>
        <Link href={`/catalog/${item.productId}`} passHref legacyBehavior>
          <a
            className={`${styles.cart__popup__list__item__text} ${darkModeClass}`}
          >
            <span>
              {item.name.replace('.', '')}, {item.product_model}
            </span>
          </a>
        </Link>
        <button onClick={deleteCartItem}>
          <span>
            {spinner ? (
              <span
                className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`}
                style={{top: 0, left: 0, width: 20, height: 20}}
              />
            ) : (
              <DeleteSvg />
            )}
          </span>
        </button>
      </div>
      <div className={styles.cart__popup__list__item__bottom}>
        { item.in_stock === 0 ? (
          <span className={styles.cart__popup__list__item__empty}>
              Нет на складе
          </span>
        ) : (
          <div />
        )}
        <span className={`${styles.cart__popup__list__item__price} ${darkModeClass}`}>
          {formatPrice(item.price)} ₽
          </span>
      </div>
    </li>
  )
}

export default CartPopupItem
