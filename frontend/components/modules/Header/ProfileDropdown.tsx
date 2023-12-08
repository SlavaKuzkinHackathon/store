
import { useEvent, useStore } from 'effector-react'
import { forwardRef } from 'react'
import ProfileSvg from '@/components/elements/ProfileSvg/ProfileSvg'
import { $mode } from '@/context/mode'
import { IWrappedComponentProps } from '@/types/common'
import { AnimatePresence, motion } from 'framer-motion'
import LogoutSvg from '@/components/elements/LogoutSvg/LogoutSvg'
import { withClickOutside } from '@/utils/withClickOutside'
import styles from '@/styles/profileDropDown/index.module.scss'
import { logoutFx } from '@/app/api/auth'
import { useRouter } from 'next/router'
import { $user, $userstate } from '@/context/user'
import PlusCircleOutlined from '@/components/elements/PlusCircleOutlined/PlusCircleOutlined'
import Link from 'next/link'

const ProfileDropDown = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const mode = useStore($mode)
    const user = useStore($user)
    const userState= useStore($userstate)


    const router = useRouter()
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const toggleProfileDropDown = () => setOpen(!open)

    const handleLogout = async () => {
      await logoutFx('/auth/logout')
      router.push('/auth')
    }

    console.log('userState.isLogged', userState.isLogged);
    

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
                {/* {userState.isLogged ? ( */}
                  <span
                    className={`${styles.profile__dropdown__username} ${darkModeClass}`}
                  >
                    { /* isAdmin */  userState.isAdmin ?  (
                      <Link href={'/admin'} passHref legacyBehavior>
                        <button className={styles.profile__dropdown__item__btn}>
                          <span
                            className={`${styles.profile__dropdown__item__text} ${darkModeClass}`}
                          >
                            Админ
                          </span>
                          <span
                            className={`${styles.profile__dropdown__item__svg} ${darkModeClass}`}
                          >
                            <PlusCircleOutlined />
                            
                          </span>
                        </button>
                      </Link>
                      
                    ) : (
                       userState.name 
                    )}
                  </span>
                {/* ) : ( */}
                  <Link href={'/auth'} passHref legacyBehavior>
                    <button className={styles.profile__dropdown__item__btn}>
                      <span
                        className={`${styles.profile__dropdown__item__text} ${darkModeClass}`}
                      >
                        Войти
                      </span>
                    </button>
                  </Link>
                 {/* )}  */}
              </li>
              { userState.isLogged  &&  (
                  <li className={styles.profile__dropdown__item}>
                    <button
                      className={styles.profile__dropdown__item__btn}
                      onClick={handleLogout}
                    >
                      <span
                        className={`${styles.profile__dropdown__item__text} ${darkModeClass}`}
                      >
                        Выйти
                      </span>
                      <span
                        className={`${styles.profile__dropdown__item__svg} ${darkModeClass}`}
                      >
                        <LogoutSvg />
                      </span>
                    </button>
                  </li>
              )}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

ProfileDropDown.displayName = 'ProfileDropDown'

export default withClickOutside(ProfileDropDown)



/* 
import { useEvent, useStore } from 'effector-react'
import { forwardRef } from 'react'
import ProfileSvg from '@/components/elements/ProfileSvg/ProfileSvg'
import { $mode } from '@/context/mode'
import { IWrappedComponentProps } from '@/types/common'
import { AnimatePresence, motion } from 'framer-motion'
import LogoutSvg from '@/components/elements/LogoutSvg/LogoutSvg'
import { withClickOutside } from '@/utils/withClickOutside'
import styles from '@/styles/profileDropDown/index.module.scss'
import { logoutFx } from '@/app/api/auth'
import { useRouter } from 'next/router'
import { $user, $userstate } from '@/context/user'

const ProfileDropDown = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const mode = useStore($mode)
    const user = useStore($user)
    const userState= useStore($userstate)


    const router = useRouter()
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const toggleProfileDropDown = () => setOpen(!open)

    const handleLogout = async () => {
      await logoutFx('/auth/logout')
      router.push('/auth')
    }

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
                <span
                  className={`${styles.profile__dropdown__username} ${darkModeClass}`}
                >
                  {user.name}
                </span>
                <span
                  className={`${styles.profile__dropdown__email} ${darkModeClass}`}
                >
                  {user.email}
                </span>
              </li>
              <li className={styles.profile__dropdown__item}>
                <button
                  className={styles.profile__dropdown__item__btn}
                  onClick={handleLogout}
                >
                  <span
                    className={`${styles.profile__dropdown__item__text} ${darkModeClass}`}
                  >
                    Выйти
                  </span>
                  <span
                    className={`${styles.profile__dropdown__item__svg} ${darkModeClass}`}
                  >
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