import Link from 'next/link'
import styles from '@/styles/auth.module.css'
import SignInForm from '../../../components/modules/AuthPage/SignInForm'
import SEO from '../../../components/SEO'
import useRedirectByUserCheck from '../../../hooks/useRedirectByUserCheck'

const AuthPage = () => {
    const { shouldLoadContent } = useRedirectByUserCheck(true)

    return (
        <>
            <SEO
                title="Войти в личный кабинет"
                description="Интернет-магазин диванов в городе Новосибирске Ваша Мебель"
                keywords="недорогие диваны от производителя"
            />
           <div className={styles.login_page}>
                <div className={styles.form}>
                    <SignInForm />
                </div>
            </div>
        </>
    )
}

export default AuthPage