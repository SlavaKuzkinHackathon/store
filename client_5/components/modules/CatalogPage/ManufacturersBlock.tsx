import { AnimatePresence, motion } from "framer-motion"
import styles from '@/styles/catalog/index.module.scss'
import { IManufacturersBlockProps } from "../../../types/catalog"
import ManufacturersBlockItem from "./ManufacturersBlockItem"

const ManufacturersBlock = ({ title, event, manufacturerList }: IManufacturersBlockProps) => {
    const checkedItems = manufacturerList.filter((item) => item.checked)
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.catalog__alert}>

            <h3 className={styles.manufacturers__tiitle}>{title} </h3>
            <ul className={styles.manufacturers__list}>
                <AnimatePresence >
                    {checkedItems.map((item) => (
                        <ManufacturersBlockItem
                            key={item.id}
                            item={item}
                            event={event}
                        />
                    ))}
                </AnimatePresence>
            </ul>
        </motion.div>
    )
}

export default ManufacturersBlock