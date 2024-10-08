import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import styles from '@/styles/dashboard/index.module.scss'
import DivansSlider from '@/components/modules/HomePage/DivansSlider'
import { useEffect, useState } from 'react'
import { IProduct } from '@/types/product'
import { getDivansOrNewFx } from '@/app/api/products'
import { toast } from 'react-toastify'
import { $shopingCart } from '@/context/shoping-cart'
import { AnimatePresence, motion } from 'framer-motion'
import DashboardSlider from '@/components/modules/HomePage/DashboardSlider'

const HomePage = () => {
  const [newDivans, setNewDivans] = useState<IProduct[]>()
  const [bestsellers, setBestellers] = useState<IProduct[]>([])
  const [spinner, setSpinner] = useState(false)
  

  const shopingCart = useStore($shopingCart)
  const [showAlert, setShowAlert] = useState(!!shopingCart.length)

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

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
      const bestellers = await getDivansOrNewFx('/products/bestsellers')
      const newDivans = await getDivansOrNewFx('/products/new')

      setBestellers(bestellers)
      setNewDivans(newDivans)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
    try {
      setSpinner(true)
      const bestellers = await getDivansOrNewFx('/products/bestsellers')
      const newDivans = await getDivansOrNewFx('/products/new')

      setBestellers(bestellers)
      setNewDivans(newDivans)
    } catch (error) {
      error
    } finally {
      setSpinner(false)
    }
  }

  const closeAlert = () => {
    setShowAlert(false)
  }

  
  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container}`}>
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`${styles.dashboard__alert} ${darkModeClass}`}
            >
              {/* <CartAlert
                count={shoppingCart.reduce(
                  (defaultCount, item) => defaultCount + item.count,
                  0
                )}
                closeAlert={closeAlert}
              /> */}
            </motion.div>
          )}
          <span />
        </AnimatePresence>
        <div /* className={styles.dashboard__brands} */>
          <DivansSlider />
        </div>
        <h2 className={`${styles.dashboard__title} ${darkModeClass}`}>
          Распродажа диванов со склада
        </h2>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>Хиты продаж</h3>
          <span />
          <DashboardSlider items={bestsellers || []} spinner={spinner} /> 
        </div>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>Новинки</h3>
          <span />
         <DashboardSlider items={newDivans || []} spinner={spinner} />
        </div>
        <div className={styles.dashboard__about}>
          <h3
            className={`${styles.dashboard__parts__title} ${styles.dashboard__about__title} ${darkModeClass}`}
          >
            О компании
          </h3>
          <p className={`${styles.dashboard__about__text} ${darkModeClass}`}>
            Производство мягкой мебели всегда было нашим основным видом
            деятельности. За 25 лет существования компании, мы в разы увеличили
            свои производственные мощности, тем самым, значительно расширив
            модельный ряд. Используя современное оборудование, труд
            квалифицированных и опытных мастеров, а также первосортные
            материалы, мы смело гарантируем отличное качество и долгий срок
            эксплуатации мягкой мебели нашего производства.
          </p>
        </div>
      </div>
    </section>
  )
}
export default HomePage
