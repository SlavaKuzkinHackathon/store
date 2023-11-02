import { useStore } from 'effector-react'
import { forwardRef } from 'react'
import ProfileSvg from '@/components/elements/ProfileSvg/ProfileSvg'
import { $mode } from '@/context/mode'
import { IWrappedComponentProps } from '@/types/common'
import { AnimatePresence, motion } from 'framer-motion'
import LogoutSvg from '@/components/elements/LogoutSvg/LogoutSvg'
import { withClickOutside } from '@/utils/withClickOutside'
import styles from '@/styles/profileDropDown/index.module.scss'
import { useAppDispatch, useAppSelector } from '@/hooks'
import Link from 'next/link'
import { RouteNames } from '@/routes'
import { AuthAsyncActionCreators } from '@/store /asyncActionCreators/auth'
import PlusCircleOutlined from '@/components/elements/PlusCircleOutlined/PlusCircleOutlined'

const ProfileDropDown = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    const toggleProfileDropDown = () => setOpen(!open)

    const { isLogged, isAdmin, userData } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    return (
      <div className={styles.profile} ref={ref}>
        <button className={styles.profile__btn} onClick={toggleProfileDropDown}>
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
              className={`${styles.profile__dropdown} ${darkModeClass}`}
              style={{ transformOrigin: 'right top' }}
            >
              <li className={styles.profile__dropdown__item}>
                {isLogged ? (
                  <span className={`${styles.profile__dropdown__username} ${darkModeClass}`}>{isAdmin ? (
                    <Link href={RouteNames.ADMIN} passHref legacyBehavior>
                      <button className={styles.profile__dropdown__item__btn}
                      >
                        <span className={`${styles.profile__dropdown__item__text} ${darkModeClass}`}>
                          Админ
                        </span>
                        <span className={`${styles.profile__dropdown__item__svg} ${darkModeClass}`}>
                          <PlusCircleOutlined />
                        </span>
                      </button>
                    </Link>
                  ) : (userData.name)}</span>
                ) : (
                  <Link href={RouteNames.LOGIN} passHref legacyBehavior>
                    <button className={styles.profile__dropdown__item__btn}>
                      <span className={`${styles.profile__dropdown__item__text} ${darkModeClass}`}>
                        Войти
                      </span>
                    </button>
                  </Link>
                )}
              </li>
              {isLogged &&
                <Link href={RouteNames.HOST} passHref legacyBehavior>
                  <li className={styles.profile__dropdown__item}>
                    <button className={styles.profile__dropdown__item__btn}
                      onClick={() => {
                        dispatch(AuthAsyncActionCreators.logout());
                      }}
                    >
                      <span className={`${styles.profile__dropdown__item__text} ${darkModeClass}`}>
                        Выйти
                      </span>
                      <span className={`${styles.profile__dropdown__item__svg} ${darkModeClass}`}>
                        <LogoutSvg />
                      </span>
                    </button>
                  </li>
                </Link>}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

ProfileDropDown.displayName = 'ProfileDropDown'

export default withClickOutside(ProfileDropDown)
