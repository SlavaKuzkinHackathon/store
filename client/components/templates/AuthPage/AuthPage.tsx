import Link from 'next/link'
import { $mode } from '@/context/mode'
import styles from '@/styles/auth/index.module.scss'
import { useStore } from 'effector-react'
import { useState } from 'react'
import SignUpForm from '@/components/modules/AuthPage/SignUpForm'

const AuthPage = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const [action, setAction] = useState(false)

  return (
    <div className={styles.login_page}>
      <div className={`${styles.form} ${darkModeClass}`}>
        <div>
          {action === true ? (
            <div></div>
          ) : (
            <form className={styles.login_form}>
              <input
                className={`${styles.input} ${darkModeClass}`}
                type="text"
                placeholder="Имя"
              />
              <input
                className={`${styles.input} ${darkModeClass}`}
                type="password"
                placeholder="Пароль"
              />
              <button className={`${styles.button} ${darkModeClass}`}>
                Войти
              </button>
              <p className={`${styles.message} ${darkModeClass}`}>
                Отсутствует регистрация?{' '}
                <Link href={''} passHref legacyBehavior>
                  <a
                    className={`${styles.a} ${darkModeClass}`}
                    onClick={() => {
                      setAction(true)
                    }}
                  >
                    {' '}
                    Создать аккаунт
                  </a>
                </Link>
              </p>
            </form>
          )}
        </div>

        <div>
          {' '}
          {action === false ? (
            <div></div>
          ) : (
            /*             <form className={styles.register_form}>
              <input
                className={`${styles.input} ${darkModeClass}`}
                type="text"
                placeholder="Имя"
              />
              <input
                className={`${styles.input} ${darkModeClass}`}
                type="password"
                placeholder="Пароль"
              />
              <input
                className={`${styles.input} ${darkModeClass}`}
                type="text"
                placeholder="email"
              />
              <button className={`${styles.button} ${darkModeClass}`}>
                Регистрация
              </button> */
            <div>
              <SignUpForm /> 

              <p className={`${styles.message} ${darkModeClass}`}>
                Зарегистрированны ?{' '}
                <Link href="" passHref legacyBehavior>
                  <a
                    className={`${styles.a} ${darkModeClass}`}
                    onClick={() => {
                      setAction(false)
                    }}
                  >
                    {' '}
                    Войти
                  </a>
                </Link>
              </p>
            </div>
            /* </form> */
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthPage
