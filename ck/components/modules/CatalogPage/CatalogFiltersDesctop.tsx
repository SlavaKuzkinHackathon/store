import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import styles from '@/styles/catalog/index.module.scss'
import {
  $productsmModels,
  setProductsmModels,
  updateProductsmModels,
} from '@/context/products'
import FilterProductModelAccordion from './FilterProductModelAccordion'
import Accordion from '@/components/elements/Accordion/Accordion'
import PriceRange from './PriceRange'
import { ICatalogFilterDesktopProps } from '@/types/catalog'

const CatalogFiltersDesctop = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
}: ICatalogFilterDesktopProps) => {
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
      <div className={styles.filters__boiler_manufacturers}>
        <FilterProductModelAccordion
          modelsList={productModels}
          title="Модели мягкой мебели"
          updateModel={updateProductsmModels}
          setModel={setProductsmModels}
        />
      </div>
      <div className={styles.filters__price}>
        <Accordion
          title="Цена"
          titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
          arrowOpenClass={styles.open}
        >
          <div className={styles.filters__manufacturer__inner}>
            <PriceRange
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              setIsPriceRangeChanged={setIsPriceRangeChanged}
            />
            <div style={{ height: 24 }} />
          </div>
        </Accordion>
      </div>
    </div>
  )
}

export default CatalogFiltersDesctop
