import { getProductsPaginateFx } from '@/app/api/products'
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'
import ModelsBlock from '@/components/modules/CatalogPage/ModelsBlock'
import { $mode } from '@/context/mode'
import { $productsm, setProductsm } from '@/context/products'
import styles from '@/styles/catalog/index.module.scss'
import { useStore } from 'effector-react'
import { AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem'

const CatalogPage = () => {
  const [spinner, setSpinner] = useState(false)
  const mode = useStore($mode)
  const products = useStore($productsm)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  useEffect(() => {
    loadProducts()
  },[])

  console.log(products);
  
  const loadProducts =async () => {
    try {
      setSpinner(true)
      const data = await getProductsPaginateFx('/products/all?limit=20&offset=0')
      setProductsm(data)
    } catch (error) {
      toast.error((error as Error).message)
    } finally{
      setSpinner(false)
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
            {spinner ? (
              <ul className={skeletonStyles.skeleton}> 
              {Array.from(new Array(8)).map((item) => (
                  <li
                  key={item}
                  className={`${skeletonStyles.skeleton__item} ${
                    mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''
                  }`}
                >
                  <div className={skeletonStyles.skeleton__item__light}/>
                </li>
              ))}
              </ul>
            ):(
              <ul className={styles.catalog__list}>
              {products.rows?.length ? (
                products.rows.map((item) => (
                  <CatalogItem  item={item} key={item.id}/>
                ))
              ) : (
                <span>Список товаров пуст...</span>
              )}
            </ul>
            )}
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default CatalogPage
