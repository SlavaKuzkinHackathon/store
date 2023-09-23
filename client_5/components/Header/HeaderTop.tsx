import React from 'react'
import CityButton from '../Elements/CityButton/CityButton'
import ProfileDropdown from './profileDropDown'
import styles from '../../src/styles/header/index.module.css'
import Link from 'next/link'

const HeaderTop = () => {
  return (
    <div className={styles.header__top}>
      <div className={`container ${styles.header__top__container}`}>
        <CityButton />
        <div className={styles.phone}>
          <Link href="tel:+7 913 913 1111" >+79139131111</Link>
        </div>
        <ProfileDropdown />
      </div>
    </div>
  )
}

export default HeaderTop