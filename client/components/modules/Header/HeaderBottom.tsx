import { $mode } from "@/context/mode"
import { useStore } from "effector-react"
import styles from '@/styles/header/index.module.scss'

const HeaderBottom = () => {
    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    return (
        <div className={styles.header__bottom}>
            <div className={`container ${styles.header__bottom__container}`}></div>
        </div>
    )
}

export default HeaderBottom