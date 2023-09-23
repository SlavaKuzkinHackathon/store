import { IFiltersPopupTop } from "../../../types/catalog"
import styles from '../../../src/styles/catalog/index.module.scss'

const FiltersPopupTop = ({
    title, resetBtnText,
    resetFilters,
    resetFilterBtnDisabled,
    closePopup
}: IFiltersPopupTop) => {

    return (
        <div className={styles.catalog__bottom__filters__top}>
            <button
            onClick={closePopup}
            className={styles.catalog__bottom__filters__title}
            >{title}</button>
            <button
                onClick={resetFilters}
                disabled={resetFilterBtnDisabled}
                className={styles.catalog__bottom__filters__reset}>
                {resetBtnText}
            </button>
        </div>
    )
}


export default FiltersPopupTop