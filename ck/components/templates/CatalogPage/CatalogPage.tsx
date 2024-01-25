import { getProductsFx } from '@/app/api/products'
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'
import ModelsBlock from '@/components/modules/CatalogPage/ModelsBlock'
import { $mode } from '@/context/mode'
import styles from '@/styles/catalog/index.module.scss'
import { useStore } from 'effector-react'
import { AnimatePresence } from 'framer-motion'

const CatalogPage = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const loadProducts =async () => {
    try {
      const data = await getProductsFx
    } catch (error) {
      
    }
  }

  return (
    <section className={styles.catalog}>
      <div className={`container ${styles.catalog__container}`}>
        <h2 className={`${styles.catalog__title} ${darkModeClass}`}>
          Каталог Мягкой Mебели
        </h2>
        <div className={`${styles.catalog__top} ${darkModeClass}`}>
          <AnimatePresence>
            <ModelsBlock title="Модели диванов" />
          </AnimatePresence>
          <div className={styles.catalog__top__inner}>
            <button>Сбросить фильтр</button>
            <FilterSelect />
          </div>
        </div>
        <div className={styles.catalog__bottom}>
          <div className={styles.catalog__bottom__inner}>
            <div>Filters</div>
            <ul className={styles.catalog__list}>
              {[].map((item) => (<li key={item}></li>))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CatalogPage
