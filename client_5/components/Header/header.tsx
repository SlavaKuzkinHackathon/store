import Image from 'next/image'
import Link from 'next/link'
import styles from './header.module.css'
import { useState } from 'react'
import HeaderBottom from './headerBottom'
import HeaderTop from './HeaderTop'

const Header = () => {

    return (
        <header className={styles.navbar}>
            <HeaderTop />
            <HeaderBottom/>
        </header>
    );
}


export default Header