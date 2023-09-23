import { motion } from "framer-motion"
import { IFilterCheckboxItem, IManufacturersBlockItemProps } from "../../../types/catalog"
import DeleteSvg from "../../Elements/DeleteSvg/DeleteSvg"
import styles from '@/styles/catalog/index.module.scss'

const ManufacturersBlockItem = ({ item, event, }: IManufacturersBlockItemProps) => {

    const removeFilter = () => event({ checked: !item.checked, id: item.id } as IFilterCheckboxItem)

    return (
        <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.manufacturers__list__item}>
            <span className={styles.manufacturers__list__item__text}>{item.title}</span>
            <button
                className={styles.manufacturers__list__item__btn}
                onClick={removeFilter}
            >
                <span><DeleteSvg /></span>
            </button>
        </motion.li>
    )
}

export default ManufacturersBlockItem