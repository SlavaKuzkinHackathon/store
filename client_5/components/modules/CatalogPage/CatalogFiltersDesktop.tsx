import { useStore } from "effector-react"
import { $divansManufactures, setDivansManufacturers, updateDivansManufacturers } from "../../../context/divans"
import styles from '../../../src/styles/catalog/index.module.scss'
import FilterManufacturerAccordion from "./FilterManufacturerAccordion"
import Accordion from "../../Elements/Accordion/Accordion"
import PriceRange from "./PriceRange"
import { ICatalogFilterDesktopProps } from "../../../types/catalog"
import spinnerStyles from '../../../src/styles/spinner/spinner.module.css'

const CatalogFiltersDesktop = ({
    priceRange,
    setPriceRange,
    setIsPriceRangeChanged,
    resetFilterBtnDisabled,
    spinner,
    resetFilters,
    applyFilters
}: ICatalogFilterDesktopProps) => {
    const divanManufactuters = useStore($divansManufactures)

    return (
        <div className={styles.catalog__bottom__filters}>
            <h3 className={styles.catalog__bottom__filters__title}>Фильтры</h3>
            <div className={styles.filters__boiler_manufacturers}>
                <FilterManufacturerAccordion
                    manufacturerList={divanManufactuters}
                    title='Производители диванов'
                    updateManufacturer={updateDivansManufacturers}
                    setManufacturer={setDivansManufacturers}
                />
            </div>
            <div className={styles.filters__price}>
                <Accordion
                    title="Цена"
                    titleClass={styles.filters__manufacturer__btn}
                    arrowOpenClass={styles.open}
                >
                    <div className={styles.filters__manufacturer__inner}>
                        <PriceRange
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            setIsPriceRangeChanged={setIsPriceRangeChanged}
                        />
                    </div>
                </Accordion>
            </div>
            <div className={styles.filters__actions}>

                <button
                    className={styles.filters__actions__show}
                    disabled={spinner || resetFilterBtnDisabled}
                    onClick={applyFilters}
                >
                    {spinner ? (
                        <span
                            className={spinnerStyles.spinner}
                            style={{ top: 6, left: '47%' }}
                        />
                    ) : (
                        'Показать'
                    )}
                </button>
                <button
                    className={styles.filters__actions__reset}
                    disabled={resetFilterBtnDisabled}
                    onClick={resetFilters}
                >Сбросить</button>
            </div>
        </div>
    )
}

export default CatalogFiltersDesktop