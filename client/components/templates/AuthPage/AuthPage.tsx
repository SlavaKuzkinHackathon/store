import Link from 'next/link'
import { $mode } from '@/context/mode'
import styles from '@/styles/auth/index.module.scss'
import { useStore } from 'effector-react'
import { useState } from 'react'

const AuthPage_2 = () => {
    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const[action, setAction] = useState(false)


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
                            <Link href={""} passHref legacyBehavior>
                                <a className={`${styles.a} ${darkModeClass}`}

                                >
                                    {' '}
                                    Создать аккаунт
                                </a>
                            </Link>
                        </p>
                    </form>
                </div>

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
                            <Link href="" passHref legacyBehavior>
                                <a className={`${styles.a} ${darkModeClass}`}> Войти</a>
                            </Link>
                        </p>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default AuthPage_2
