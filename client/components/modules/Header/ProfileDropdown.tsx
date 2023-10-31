import { FC } from 'react'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import styles from '@/styles/userMenu/index.module.scss'
import { useAppDispatch, useAppSelector } from '@/hooks'
import Link from 'next/link'
import { RouteNames } from '@/routes'
import { Tooltip } from 'antd'
import classNames from 'classnames'
import {
  LogoutOutlined,
  PlusCircleOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { AuthAsyncActionCreators } from '@/store /asyncActionCreators/auth'

const ProfileDropDown: FC = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const { isLogged, isAdmin, userData } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  return (
    <div className={styles.wrapper}>
      {isLogged ? (
        <span className={styles.name}>{isAdmin ? "Админ" : userData.name}</span>
      ) : (
        <Link href={RouteNames.LOGIN} passHref legacyBehavior>
          <Tooltip placement="bottom" title="Войти">
            <a className={classNames(styles.link, styles.userLink)}>
              <UserOutlined />
            </a>
          </Tooltip>
        </Link>
      )}
      {isLogged && (
        <Tooltip placement="bottom" title="Выйти">
          <button
            onClick={() => {
              dispatch(AuthAsyncActionCreators.logout());
            }}
            className={styles.button}
          >
            <LogoutOutlined />
          </button>
        </Tooltip>
      )}
      
    </div>
  )
}

export default ProfileDropDown

/* import { useStore } from 'effector-react'
import { forwardRef } from 'react'
import ProfileSvg from '@/components/elements/ProfileSvg/ProfileSvg'
import { $mode } from '@/context/mode'
import { IWrappedComponentProps } from '@/types/common'
import { AnimatePresence, motion } from 'framer-motion'
import LogoutSvg from '@/components/elements/LogoutSvg/LogoutSvg'
import { withClickOutside } from '@/utils/withClickOutside'
import styles from '@/styles/profileDropDown/index.module.scss'

const ProfileDropDown = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    const toggleProfileDropDown = () => setOpen(!open)

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
              <li className={styles.profile__dropdown__user}>
                <span className={`${styles.profile__dropdown__username} ${darkModeClass}`}>Vova</span>
                <span className={`${styles.profile__dropdown__email} ${darkModeClass}`}>
                  vova@mail.ru
                </span>
              </li>
              <li className={styles.profile__dropdown__item}>
                <button className={styles.profile__dropdown__item__btn}>
                  <span className={`${styles.profile__dropdown__item__text} ${darkModeClass}`}>
                    Выйти
                  </span>
                  <span className={`${styles.profile__dropdown__item__svg} ${darkModeClass}`}>
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

export default withClickOutside(ProfileDropDown)
 */
