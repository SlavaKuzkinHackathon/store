import Link from 'next/link'
import { $mode } from '@/context/mode'
import styles from '@/styles/auth/index.module.scss'
import { useStore } from 'effector-react'

const RegisterPage = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div className={styles.login_page}>
      <div className={`${styles.form} ${darkModeClass}`}>
        <div>
          <form className={styles.register_form}>
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
            </button>
            <p className={`${styles.message} ${darkModeClass}`}>
              Зарегистрированы ?{' '}
              <Link href="/auth/AuthPage" passHref legacyBehavior>
                <a className={`${styles.a} ${darkModeClass}`}> Войти</a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
