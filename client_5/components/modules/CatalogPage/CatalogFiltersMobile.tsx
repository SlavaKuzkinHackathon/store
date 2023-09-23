import { ICatalogFilterMobileProps } from "../../../types/catalog"
import styles from '../../../src/styles/catalog/index.module.scss'
import FiltersPopupTop from "./FiltersPopupTop"
import FiltersPopup from "./FiltrsPopup"
import { $divansManufactures, setDivansManufacturers, updateDivansManufacturers } from "../../../context/divans"
import { useStore } from "effector-react"
import { useState } from "react"
import spinnerStyles from '../../../src/styles/spinner/spinner.module.css'
import { useMediaQuery } from "../../../hooks/useMediaQuery"
import Accordion from "../../Elements/Accordion/Accordion"
import PriceRange from "./PriceRange"

const CatalogFiltersMobile = ({
    spinner,
    resetFilterBtnDisabled,
    resetFilters,
    closePopup,
    applyFilters,
    filtersMobileOpen,
    setPriceRange,
    priceRange,
    setIsPriceRangeChanged
}: ICatalogFilterMobileProps) => {
    const divanManufactuters = useStore($divansManufactures)
    const [openDivans, setOpenDivans] = useState(false)
    const handleOpenDivans = () => setOpenDivans(true)
    const handleCloseDivans = () => setOpenDivans(false)
    const isAnyDivanManufacturerChecked = divanManufactuters.some((item) => item.checked)

    const isMobile = useMediaQuery(820)

    const resetAllDivansManufacturers = () =>
        setDivansManufacturers(divanManufactuters.map(
            (item) => ({ ...item, checked: false }
            )))


    const applyFiltersAndClosePopup = () => {
        applyFilters()
        closePopup()
    }

    return (
        <div
            className={`${styles.catalog__bottom__filters}${filtersMobileOpen ? styles.open : ''
                }`}
        >
            <div className={styles.catalog__bottom__filters__inner}>
                <FiltersPopupTop
                    resetBtnText='Сбросить всё'
                    title='Фильтры'
                    resetFilters={resetFilters}
                    resetFilterBtnDisabled={resetFilterBtnDisabled}
                    closePopup={closePopup}


                />
                <div className={styles.filters__boiler_manufacturersers}>
                    <button className={styles.filters__manufacturer__btn}
                        onClick={handleOpenDivans}
                    >
                        Производители диванов
                    </button>
                    <FiltersPopup
                        title="Производители диванов"
                        resetFilterBtnDisabled={!isAnyDivanManufacturerChecked}
                        updateManufacturer={updateDivansManufacturers}
                        setManufacturer={setDivansManufacturers}
                        applyFilters={applyFiltersAndClosePopup}
                        manufacturerList={divanManufactuters}
                        resetAllDivans={resetAllDivansManufacturers}
                        handleClosePopup={handleCloseDivans}
                        openPopup={openDivans}
                    />
                </div>
                <div className={styles.filters__price}>
                    <Accordion
                        title="Цена"
                        titleClass={styles.filters__manufacturer__btn}
                        hideArrowClass={styles.hide__arrow}
                        isMobileForFilters={isMobile}
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
            </div>

            <div className={styles.filters__actions}>
                <button
                    className={styles.filters__actions__show}
                    onClick={applyFiltersAndClosePopup}
                    disabled={resetFilterBtnDisabled}
                >
                    {spinner ? <span
                        className={spinnerStyles.spinner}
                        style={{ top: 6, left: '47%' }}
                    /> : 'Показать'}
                </button>
            </div>
        </div>
    )
}


export default CatalogFiltersMobile