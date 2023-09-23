/* eslint-disable @next/next/no-img-element */
import { getDivansOrNewFx } from '../../../app/api/divans'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import DashboardSlider from '../../modules/DashboardPage/DashboardSlider'
import DivansSlider from '../../modules/DashboardPage/DivansSlider'
import { IDivans } from '../../../types/divans'
import { useStore } from 'effector-react'
import { $shopingCart } from '../../../context/shopping-cart'
import { AnimatePresence, motion } from 'framer-motion'
import CartAlert from '../../modules/DashboardPage/CartAlert'
import styles from '../../../src/styles/dashboard/index.module.scss'



const DashboardPage = () => {

    const [newDivans, setNewDivans] = useState<IDivans>({} as IDivans)
    const [bestellers, setBestellers] = useState<IDivans>({} as IDivans)
    const [spinner, setSpinner] = useState(false)

    const shopingCart = useStore($shopingCart)
    const [showAlert, setShowAlert] = useState(!!shopingCart.length)

    useEffect(() => {
        loadDivans()
    }, [])

    useEffect(() => {
        if (shopingCart.length) {
            setShowAlert(true)
            return
        }
        setShowAlert(false)
    }, [shopingCart.length])

    const loadDivans = async () => {
        try {
            setSpinner(true)
            const bestellers = await getDivansOrNewFx('/divans/bestsellers')
            const newDivans = await getDivansOrNewFx('/divans/new')

            setBestellers(bestellers)
            setNewDivans(newDivans)
        } catch (error) {
            toast.error((error as Error).message)
        } finally {
            setSpinner(false)
        }
        try {
            setSpinner(true)
            const bestellers = await getDivansOrNewFx('/divans/bestsellers')
            const newDivans = await getDivansOrNewFx('/divans/new')

            setBestellers(bestellers)
            setNewDivans(newDivans)
        } catch (error) {
            error
        } finally {
            setSpinner(false)
        }
    }

    const closeAlert = () => { setShowAlert(false) }

    return (
        <section className={styles.dashboard}>
            <div className={`container ${styles.dashboard__container}`}>
                <AnimatePresence>
                    {showAlert && <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.dashboard__alert}
                    ><CartAlert count={shopingCart.reduce(
                        (defaultCount, item) => defaultCount + item.count, 0)
                    }
                        closeAlert={closeAlert} /></motion.div>}
                </AnimatePresence>
                <div className={styles.dashboard__divansPhSlide__slider}>
                    <DivansSlider />
                </div>
                <h2 className={styles.dashboard__title}>
                    Распродажа диванов со склада
                </h2>
                <div className={styles.dashboard__divans}>
                    <h3 className={styles.dashboard__divans__title}>
                        Хиты продаж
                    </h3>
                    <DashboardSlider items={bestellers.rows || []} spinner={spinner} />
                </div>
                <div className={styles.dashboard__divans}>
                    <h3 className={styles.dashboard__divans__title}>
                        Новинки
                    </h3>
                    <DashboardSlider items={newDivans.rows || []} spinner={spinner} />
                </div>
                <div className={styles.dashboard__about}>
                    <h3 className={`${styles.dashboard__divans__title} ${styles.dashboard__about__title}`}>О компании</h3>
                    <p className={styles.dashboard__about__text}>
                        Производство мягкой мебели всегда было нашим основным видом деятельности.
                        За 18 лет существования компании, мы в разы увеличили свои производственные мощности,
                        тем самым, значительно расширив модельный ряд. Используя современное оборудование,
                        труд квалифицированных и опытных мастеров, а также первосортные материалы,
                        мы смело гарантируем отличное качество и долгий срок эксплуатации мягкой мебели нашего производства.
                    </p>
                </div>

            </div>
        </section >
    )
}

export default DashboardPage