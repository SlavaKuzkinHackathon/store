import styles from '@/styles/header/index.module.scss'
import Link from 'next/link'

const HeaderTop = () => {
  console.log(' ')
  return (
    <div className={styles.header__top}>
      <div className={`container ${styles.header__top__container}`}>
        <nav className={styles.header__nav}>
          <ul className={styles.header__nav__list}>
            <li className={styles.header__nav__list__item}>
              <Link href="/catalog" passHref legacyBehavior>
                <a className={styles.header__nav__list__item__link}>Каталог</a>
              </Link>
              <Link href="/about" passHref legacyBehavior>
                <a className={styles.header__nav__list__item__link}>О компании</a>
              </Link>
              <Link href="'/shiping-payment'" passHref legacyBehavior>
                <a className={styles.header__nav__list__item__link}>Доставка и оплата</a>
              </Link>
              <Link href="/contacts" passHref legacyBehavior>
                <a className={styles.header__nav__list__item__link}>Контакты</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default HeaderTop
