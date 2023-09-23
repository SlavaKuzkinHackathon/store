import { IFilterPopupProps } from "../../../types/catalog"
import FiltersPopupTop from "./FiltersPopupTop"
import FilterManufacturerAccordion from "./FilterManufacturerAccordion"
import styles from '../../../src/styles/catalog/index.module.scss'


const FiltersPopup = ({
    resetFilterBtnDisabled,
    resetAllDivans,
    handleClosePopup,
    setManufacturer,
    updateManufacturer,
    applyFilters,
    openPopup,
    title,
    manufacturerList,
}: IFilterPopupProps) => {
    return (
        <div className={`${styles.filters__popup}${openPopup ? styles.open : ''}`}>
            <div className={styles.filters__popup__inner}>
                <FiltersPopupTop
                    resetBtnText='Сбросить'
                    title={title as string}
                    resetFilterBtnDisabled={resetFilterBtnDisabled}
                    resetFilters={resetAllDivans}
                    closePopup={handleClosePopup}
                />
                <FilterManufacturerAccordion
                    manufacturerList={manufacturerList}
                    title={false}
                    setManufacturer={setManufacturer}
                    updateManufacturer={updateManufacturer}
                />
            </div>
            <div className={styles.filters__actions}>

                <button
                    className={styles.filters__actions__show}
                    disabled={resetFilterBtnDisabled}
                    onClick={applyFilters}
                    style={{marginBottom: 12}}
                >Показать
                </button>
                <button
                    className={styles.filters__actions__reset}
                    onClick={handleClosePopup}
                >Назад</button>
            </div>
        </div>
    )
}

export default FiltersPopup