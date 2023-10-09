import Link from 'next/link'
import CityButton from '@/components/elements/CityButton/CityButton'
import ProfileDropdown from './ProfileDropdown'
import styles from '@/styles/header/index.module.scss'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'

const HeaderTop = () => {
  const isMedia950 = useMediaQuery(950)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  return (
    <div className={styles.header__top}>
      <div className={`container ${styles.header__top__container}`}>
        {!isMedia950 && <CityButton />}
        {isMedia950 && (
          <button className={`${styles.burger_menu} ${darkModeClass}`}>
            <span />
            <span />
            <span />
          </button>
        )}
        <nav className={styles.header__nav}>
          <ul className={styles.header__nav__list}>
            <li className={styles.header__nav__list__item}>
              <Link href="/catalog" passHref legacyBehavior>
                <a className={styles.header__nav__list__item__link}>Каталог</a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href="/about" passHref legacyBehavior>
                <a className={styles.header__nav__list__item__link}>
                  О компании
                </a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href="'/shiping-payment'" passHref legacyBehavior>
                <a className={styles.header__nav__list__item__link}>
                  Доставка и оплата
                </a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href="/contacts" passHref legacyBehavior>
                <a className={styles.header__nav__list__item__link}>Контакты</a>
              </Link>
            </li>
            {isMedia950 && (
              <li className={styles.header__nav__list__item}>
                <CityButton />
              </li>
            )}
            {isMedia950 && (
              <li className={styles.header__nav__list__item}>
                <ModeToggler />
              </li>
            )}
          </ul>
        </nav>
        <ProfileDropdown />
      </div>
    </div>
  )
}

export default HeaderTop
