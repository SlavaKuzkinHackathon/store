import { useEffect, useState } from "react"
import { ICartItemCounterProps } from "../../../types/shoping-cart"
import MinusSvg from "../MinusSvg/MinusSvg"
import PlusSvg from "../PlusSvg/PlusSvg"
import { toast } from "react-toastify"
import { updateCartItemFx } from "../../../app/api/shoping-cart"
import { updateCartItemCount } from "../../../context/shopping-cart"
import styles from '../../../src/styles/cartPopup/index.module.css'
import spinnerStyles from '../../../src/styles/spinner/spinner.module.css'

const CartItemCounter = ({
    totalCount,
    divansId,
    initialCount,
    increasePrice,
    decreasePrice
}: ICartItemCounterProps) => {

    const [spinner, setSpinner] = useState(false)
    const [count, setCount] = useState(initialCount)
    const [desableIncrease, setDesableIncrease] = useState(false)
    const [desableDecrease, setDesableDecrease] = useState(false)

    useEffect(() => {
        if(count === 1){
            setDesableDecrease(true)
        }

        if(count === totalCount){
            setDesableIncrease(true)
        }
    },[count, totalCount])


    const increase = async () => {
        try {
            setSpinner(true)
            increasePrice()
            setDesableDecrease(false)
            setCount(count + 1)

            const data = await updateCartItemFx({
                url: `/cart/count/${divansId}`,
                payload: {count : count + 1},
            })

            updateCartItemCount({divansId, count: data.count})
        } catch (error) {
            toast.error((error as Error).message)
        } finally {
            setSpinner(false)
        }
    }

    const decrease = async () => {
        try {
            setSpinner(true)
            decreasePrice()
            setDesableIncrease(false)
            setCount(count - 1)

            const data = await updateCartItemFx({
                url: `/cart/count/${divansId}`,
                payload: {count : count - 1},
            })
        } catch (error) {
            toast.error((error as Error).message)
        } finally {
            setSpinner(false)
        }
    }


    return (
        <div className={styles.cart__popup__list__item__counter}>
            <button
                disabled={desableDecrease}
                onClick={decrease}
            >
                <MinusSvg />
            </button>
            <span>{spinner ?
                <span
                    className={spinnerStyles.spinner}
                    style={{ left: 33, top: 4, width: 20, height: 20 }}
                /> : count}</span>
            <button
                disabled={desableIncrease}
                onClick={increase}
            >
                <PlusSvg />
            </button>
        </div>
    )
}

export default CartItemCounter