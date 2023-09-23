import { useStore } from 'effector-react'
import { $shopingCart, $totalPrice, setShopingCart } from '../../../context/shopping-cart'
import { formatPrice } from '@/utils/common'
import OrderAccordion from '../../modules/OrderPage/OrderAccordion'
import { useEffect, useState } from 'react'
import { checkPaymentFx, makePaymentFx } from '../../../app/api/payment'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { RemoveFromCartFx } from '../../../app/api/shoping-cart'
import { $user, $userCity } from '../../../context/user'
import styles from '../../../src/styles/order/index.module.scss'
import spinnerStyles from '../../../src/styles/spinner/spinner.module.css'

const OrderPage = () => {
    const shopingCart = useStore($shopingCart)
    const totalPrice = useStore($totalPrice)
    const userCity = useStore($userCity)
    const [orderIsReady, setOrderIsReady] = useState(false)
    const [agreement, setAgreement] = useState(false)
    const spinner = useStore(makePaymentFx.pending)
    const router = useRouter()
    const user = useStore($user)

    const handleAgreementChange = () => setAgreement(!agreement)

    /*     useEffect(() => {
            const paymentId = sessionStorage.getItem('paymentId')
    
            if (paymentId) {
                checkPayment(paymentId)
            }
    
        }, []) */

    useEffect(() => {
        const paymentId = sessionStorage.getItem('paymentId')

        if (paymentId) {
            checkPayment(paymentId)
        }
    }, [])

    const makePay = async () => {
        try {
            const data = await makePaymentFx({
                url: '/payment',
                amount: totalPrice,
                description: `Заказ №1 ${userCity.city.length
                        ? `Город: ${userCity.city}, улица: ${userCity.street}`
                        : ''
                    }`,
            })
            sessionStorage.setItem('paymentId', data.id)

            router.push(data.confirmation.confirmation_url)
        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    const checkPayment = async (paymentId: string) => {
        try {
            const data = await checkPaymentFx({
                url: '/payment/info',
                paymentId,
            })

            if (data.status === 'succeeded') {
                resetCart()
                return
            }

            sessionStorage.removeItem('paymentId')
        } catch (error) {
            console.log((error as Error).message)
            resetCart()
        }
    }

    const resetCart = async () => {
        sessionStorage.removeItem('paymentId')
        await RemoveFromCartFx(`/cart/all${user.userId}`)
        setShopingCart([])
    }

    

    return (
        <section className={styles.order}>
            <div className='container'>
                <h2 className={styles.order__title}>
                    Оформление заказа
                </h2>
                <div className={styles.order__inner}>
                    <div className={styles.order__cart}>
                        <OrderAccordion
                            setOrderIsReady={setOrderIsReady}
                            showDoneIcon={orderIsReady} />
                    </div>
                    <div className={styles.order__pay}>
                        <h3 className={styles.order__pay__title}>
                            Итого:
                        </h3>
                        <div className={styles.order__pay__inner}>
                            <div className={styles.order__pay__goods}>
                                <span> Товары ({shopingCart.reduce(
                                    (defaultCount, item) => defaultCount + item.count, 0)
                                })
                                </span>
                                <span>{formatPrice(totalPrice)} ₽</span>
                            </div>
                            <div className={styles.order__pay__total}>
                                <span>На сумму </span>
                                <span>{formatPrice(totalPrice)} ₽</span>
                            </div>
                            <button
                                disabled={!(orderIsReady && agreement)}
                                className={styles.order__pay__btn}
                                onClick={makePay}
                            >
                                {spinner ? (
                                    <span
                                        className={spinnerStyles.spinner}
                                        style={{ top: '6px', left: '47%' }}
                                    />
                                ) : (
                                    'Подтвердить заказ'
                                )}
                            </button>
                            <label
                                className={styles.order__pay__rights}
                            >
                                <input
                                    className={styles.order__pay__rights__input}
                                    type="checkbox"
                                    onChange={handleAgreementChange}
                                    checked={agreement}
                                />
                                <span className={styles.order__pay__rights__text}>
                                    <strong>Согласен с условиями</strong> Правил пользования
                                    торговой площадкой и правилами возврата
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OrderPage