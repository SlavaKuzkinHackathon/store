import { useStore } from 'effector-react'
import { $divan } from '../../../context/divan'
import DivanImagesList from '../../modules/DivanPage/DivanImagesList'
import { formatPrice } from '@/utils/common'
import { $shopingCart } from '../../../context/shopping-cart'
import { useEffect} from 'react'
import CartHoverCheckedSvg from '../../Elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
import CartHoverSvg from '../../Elements/CartHoverSvg/CartHoverSvg'
import { toggleCartItem } from '@/utils/shoping-cart'
import { $user } from '../../../context/user'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import DivanTabs from '../../modules/DivanPage/DivanTabs'
import DashboardSlider from '../../modules/DashboardPage/DashboardSlider'
import { toast } from 'react-toastify'
import { getDivansFx } from '../../../app/api/divans'
import { $divans, setDivans, setDivansByPopularity } from '../../../context/divans'
import DivanAccordion from '../../modules/DivanPage/DivanAccordion'
import { RemoveFromCartFx } from '../../../app/api/shoping-cart'
import styles from '../../../src/styles/divan/index.module.scss'
import spinnerStyles from '../../../src/styles/spinner/spinner.module.css'

const DivanPage = () => {

    const divan = useStore($divan)
    const divans = useStore($divans)
    const cartItems = useStore($shopingCart)
    const isMobile = useMediaQuery(850)
    const user = useStore($user)
    const isInCart = cartItems.some((item) => item.divansId === divan.id)
    const spinnerToggleCart= useStore(RemoveFromCartFx.pending)
    const spinnerSlider = useStore(getDivansFx.pending)

    useEffect(() => {
        loadDivan()
    }, [])

    const loadDivan = async () => {
        try {
            const data = await getDivansFx('/divans?limit=20&offset=0')
            setDivans(data)
            setDivansByPopularity()
        } catch (error) {
            toast.error((error as Error).message)
        }

    }

    const toggleToCart = () =>
        toggleCartItem(user.username, divan.id, isInCart)

    return (
        <section>
            <div className="container">
                <div className={styles.divan__top}>
                    <h2 className={styles.divan__title}>{divan.name}</h2>
                    <div className={styles.divan__inner}>
                        <DivanImagesList />
                        <div className={styles.divan__info}>
                            <span className={styles.divan__info__price}>
                                {formatPrice(divan.price || 0)} ₽
                            </span>
                            <span className={styles.divan__info__stock}>
                                {divan.in_stock > 0 ? (
                                    <span className={styles.divan__info__stock__success}>
                                        Есть на складе
                                    </span>
                                ) : (
                                    <span className={styles.divan__info__stock__not}>
                                        Нет на складе
                                    </span>
                                )}
                            </span>
                            <span className={styles.divan__info__code}>
                                Артикул: {divan.vendor_code}
                            </span>
                            <button className={`${styles.part__info__btn} ${isInCart ? styles.in_cart : ''
                                }`}
                                onClick={toggleToCart}
                            >
                                {spinnerToggleCart ? (
                                    <span
                                        className={spinnerStyles.spinner}
                                        style={{ top: 10, left: '45%' }}
                                    />
                                ) : (
                                    <>
                                        <span className={styles.part__info__btn__icon}>
                                            {isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}
                                        </span>
                                        {isInCart ? (
                                            <span>Добавлено в карзину</span>
                                        ) : (
                                            <span>Положить в корзину</span>
                                        )}
                                    </>
                                )}
                            </button>
                            {!isMobile && <DivanTabs />}
                        </div>

                    </div>
                </div>
                {isMobile && (
                    <div className={styles.divan__accordion}>
                        <div className={styles.divan__accordion__inner}>
                            <DivanAccordion
                                title='Описание'
                            >
                                <div className={styles.divan__accordion__content}>
                                    <h3 className={styles.divan__tabs__content__title}>
                                        {divan.name}
                                    </h3>
                                </div>
                                <p className={styles.divan__tabs__content__text}>
                                    {divan.description}
                                </p>
                            </DivanAccordion>
                        </div>
                        <DivanAccordion
                            title='Совместимость'
                        >
                            <div className={styles.divan__accordion__content}>
                            </div>
                            <p className={styles.divan__tabs__content__text}>
                                {divan.popularity}
                            </p>
                        </DivanAccordion>
                    </div>
                )}
                <div className={styles.divan__bottom}>
                    <h2 className={styles.divan__title}>
                        Вам понравится
                    </h2>
                    <DashboardSlider
                        goToPathPage
                        spinner={spinnerSlider}
                        items={divans.rows || []}

                    />
                </div>
            </div>
        </section>
    )
}

export default DivanPage