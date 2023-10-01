import ProfileSvg from '@/components/elements/ProfileSvg/ProfileSvg'
import { $mode } from '@/context/mode'
import { IWrappedComponentProps } from '@/types/common'
import { useStore } from 'effector-react'
import { forwardRef } from 'react'
import styles from '@/styles/profileDropDown/index.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import LogoutSvg from '@/components/elements/LogoutSvg/LogoutSvg'

const ProfileDropDown = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    return (
      <div className={styles.profile}>
        <button className={styles.profile__btn}>
          <span className={styles.profile__span}>
            <ProfileSvg />
          </span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={styles.profile__dropdown}
              style={{ transformOrigin: 'right top' }}
            >
              <li className={styles.profile__dropdown__user}>
                <span className={styles.profile__dropdown__username}>Vova</span>
                <span className={styles.profile__dropdown__email}>
                  vova@mail.ru
                </span>
              </li>
              <li className={styles.profile__dropdown__item}>
                <button className={styles.profile__dropdown__item__btn}>
                  <span className={styles.profile__dropdown__item__text}>Выйти</span>
                  <span className={styles.profile__dropdown__item__svg}>
                    <LogoutSvg />
                  </span>
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

ProfileDropDown.displayName = 'ProfileDropDown'
