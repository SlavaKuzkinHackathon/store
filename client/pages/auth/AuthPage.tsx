import Link from 'next/link'
import { $mode } from '@/context/mode'
import styles from '@/styles/auth/index.module.scss'
import { useStore } from 'effector-react'

const AuthPage = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''



  return (
    <div className={styles.login_page}>
      <div className={`${styles.form} ${darkModeClass}`}>
        <div>
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
              Отсутствует регистрации?{' '}
              <Link href={"/auth/RegisterPage"} passHref legacyBehavior>
              <a className={`${styles.a} ${darkModeClass}`}
                
              >
                {' '}
                Создать аккаунт
              </a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
