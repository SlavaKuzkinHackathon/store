import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import styles from '@/styles/catalog/index.module.scss'
import { $productsmModels } from '@/context/products'
 
 const FilterProductModelAccordion = () =>{
    const mode = useStore($mode)
    const productModels = useStore($productsmModels)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  
    return (
      <div className={`${styles.catalog__bottom__filters} ${darkModeClass}`}>
        <h3
          className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`}
        >
          Фильтры
        </h3>
        <div className={styles.filters__boiler_manufacturers}></div>
      </div>
    )
 }

 export default FilterProductModelAccordion