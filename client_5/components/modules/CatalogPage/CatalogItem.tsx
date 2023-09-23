/* eslint-disable @next/next/no-img-element */

import { IDivan } from "../../../types/divans"
import Link from "next/link"
import { formatPrice } from "@/utils/common"
import { useStore } from "effector-react"
import { $shopingCart } from "../../../context/shopping-cart"
import CartHoverCheckedSvg from "../../Elements/CartHoverCheckedSvg/CartHoverCheckedSvg"
import CartHoverSvg from "../../Elements/CartHoverSvg/CartHoverSvg"
import { toggleCartItem } from "@/utils/shoping-cart"
import { $user } from "../../../context/user"
import { RemoveFromCartFx } from "../../../app/api/shoping-cart"
import spinnerStyles from '../../../src/styles/spinner/spinner.module.css'
import styles from '../../../src/styles/catalog/index.module.scss'

const CatalogItem = ({ item }: { item: IDivan }) => {
    const shopingCart = useStore($shopingCart)
    const user = useStore($user)
    const isInCart = shopingCart.some((cartItem) => cartItem.divansId === item.id)
    const spinner = useStore(RemoveFromCartFx.pending)

    const toggleToCart = () => toggleCartItem(user.username, item.id, isInCart)

    return (
        <li className={styles.catalog__list__item}>
            <img src={JSON.parse(item.images)[0]} alt={item.name} />
            <div className={styles.catalog__list__item__inner}>
                <Link href={`/catalog/${item.id}`} passHref legacyBehavior>
                    <h3 className={styles.catalog__list__item__title}>{item.name}</h3>
                </Link>
                <span className={styles.catalog__list__item__code}>Артикул: {item.vendor_code}</span>
                <span className={styles.catalog__list__item__price}>{formatPrice(item.price)} ₽</span>
            </div>
            <button className={`${styles.catalog__list__item__cart} ${isInCart ? styles.added : ''}`}
            disabled={spinner}
            onClick={toggleToCart}
            >
                {spinner ? (
                    <div className={spinnerStyles.spinner} style={{ top: 6, left: 6 }} />
                ) : (
                    <span> {isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}</span>
                )}
            </button>
        </li>

    )
}

export default CatalogItem