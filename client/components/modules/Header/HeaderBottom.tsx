/* eslint-disable @next/next/no-img-element */
import { $mode } from "@/context/mode"
import { useStore } from "effector-react"
import styles from '@/styles/header/index.module.scss'
import Link from "next/link"
import SearchSvg from "@/components/elements/SearchSvg/SearchSvg"

const HeaderBottom = () => {
    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    return (
        <div className={styles.header__bottom}>
            <div className={`container ${styles.header__bottom__container}`}>
                <h1 className={styles.header__logo}>
                    <Link href='/'>
                    <a className={styles.header__logo__link}>
                        <img src='/img/logo.svg' alt='логотип' />
                        <span className={`${styles.header__logo__link__text} ${styles.dark_mode}`}></span>
                    </a>
                    </Link>
                </h1>
                <div className={styles.header__search}>
                    <input type='text'/>
                    <span>
                        <SearchSvg />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default HeaderBottom