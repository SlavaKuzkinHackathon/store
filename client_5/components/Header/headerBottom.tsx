import Image from 'next/image'
import Link from 'next/link'
import styles from './header.module.css'
import { forwardRef, useEffect, useState } from 'react'
import CartPopup from './CartPopup/CartPopup'
import { IWrappedComponentProps } from '../../types/common'
import { withClickOutside } from '@/utils/withClickOutside'
import GamburgerSvg from '../Elements/GamburgerSvg/GamburgerSvg'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { setDisableCart } from '../../context/shopping-cart'

const HeaderBottom = forwardRef<HTMLDivElement, IWrappedComponentProps>(
    ({ open, setOpen }, ref) => {
        const [isMenuChecked, setIsMenuChecked] = useState(false);
        const toggleNavBarDropDown = () => setOpen(!open)
        const router = useRouter()

        useEffect(() => {
            if(router.pathname === '/order'){
                setDisableCart(true)
                return
            }
            setDisableCart(false)
        },[router.pathname])

        return (

            <div className={styles.wrapper__bottom}>
                <Link href='/' className={styles.logo_navbar}>
                    <Image src="../../Images/logo_2.svg" width="85" height="30" alt="Логотип" />
                </Link>

                <nav>
                    <div >
                        <ul className={`${styles.links} ${isMenuChecked ? styles.nav_place_header_active : ''}`}>
                            <li onClick={() => setIsMenuChecked(false)} className={`${styles.link} link`}>
                                <Link href={'/'}>Диваны</Link>
                            </li>
                            <li onClick={() => setIsMenuChecked(false)} className={`${styles.link} link`}>
                                <Link href={'/catalog'}>Каталог</Link>
                            </li>
                            <li onClick={() => setIsMenuChecked(false)} className={`${styles.link} link`}>
                                <Link href={'/shiping-payment'}>Доставка и оплата</Link>
                            </li>
                            <li onClick={() => setIsMenuChecked(false)} className={`${styles.link} link`}>
                                <Link href='/contacts'>Контакты</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <nav>
                    <ul className={styles.icons}>
                        <li className={styles.icon}>
                            <Link href='/auth/login'>
                                <Image src="../../Images/person.svg" width="22" height="25" alt="ЛК" />
                            </Link>
                        </li>
                        <li className={styles.icon}>
                            <Link href={''}>
                                <Image src="../../Images/star.svg" width="22" height="25" alt="ЛК" />
                            </Link>
                        </li>
                        <li className={styles.icon}>
                            <CartPopup />
                        </li>
                    </ul>
                </nav>

                <div className={styles.hamburger_menu} ref={ref}>
                    <button className={styles.gamburger__btn} onClick={toggleNavBarDropDown}>
                        <span className={styles.gamburger__span}>
                            <GamburgerSvg />
                        </span>
                    </button>

                    <AnimatePresence>
                        {open && <motion.ul
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className={styles.gamburger__dropdown}
                            style={{ transformOrigin: 'rigth top' }}
                        >
                            <li onClick={toggleNavBarDropDown} className={`${styles.link} link`}>
                                <Link href={'/'}>Диваны</Link>
                            </li>
                            <li onClick={toggleNavBarDropDown} className={`${styles.link} link`}>
                                <Link href={'/catalog'}>Каталог</Link>
                            </li>
                            <li onClick={toggleNavBarDropDown} className={`${styles.link} link`}>
                                <Link href={'/shiping-payment'}>Доставка и оплата</Link>
                            </li>
                            <li onClick={toggleNavBarDropDown} className={`${styles.link} link`}>
                                <Link href='/contacts'>Контакты</Link>
                            </li>
                        </motion.ul>}
                    </AnimatePresence>
                </div>
            </div>
        );
    }
)

HeaderBottom.displayName = 'HeaderBottom'

export default withClickOutside(HeaderBottom)