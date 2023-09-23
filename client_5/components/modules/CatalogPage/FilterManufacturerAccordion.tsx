import { useMediaQuery } from "../../../hooks/useMediaQuery"
import { IFilterAccordionProps } from "../../../types/catalog"
import Accordion from "../../Elements/Accordion/Accordion"
import FilterCheckboxItem from "./FilterCheckboxItem"
import styles from '../../../src/styles/catalog/index.module.scss'

const FilterManufacturerAccordion = ({
    manufacturerList,
    title,
    setManufacturer,
    updateManufacturer
}:
    IFilterAccordionProps) => {

    const isMobile = useMediaQuery(820)

    const chooseAllManufacturers = () =>
        setManufacturer(
            manufacturerList.map((item) => ({ ...item, checked: true }))
        )

    return (
        <Accordion title={title}
            titleClass={styles.filters__manufacturer__btn}
            arrowOpenClass={styles.open}
            isMobileForFilters={isMobile}
            hideArrowClass={isMobile ? styles.hide_arrow : ''}>

            <div className={styles.filters__manufacturer__inner}>
                <button
                    className={styles.filters__manufacturer__select_all}
                    onClick={chooseAllManufacturers}
                >
                    Выбрать все
                </button>
                <ul className={styles.filters__manufacturer__list}>
                    {manufacturerList.map((item) => (
                        <FilterCheckboxItem
                            title={item.title}
                            id={item.id}
                            key={item.id}
                            checked={item.checked}
                            event={updateManufacturer}
                        />
                    ))}
                </ul>
                <div style={{ height: 24 }} />
            </div>
        </Accordion>
    )
}

export default FilterManufacturerAccordion