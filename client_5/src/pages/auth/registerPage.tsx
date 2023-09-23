import Link from 'next/link'
import styles from '@/styles/auth.module.css'
import SignUpForm from '../../../components/modules/AuthPage/SignUpForm'
import SEO from '../../../components/SEO'

const RegisterPage = () => {

    function swithForm(): void {
        /* throw new Error('Function not implemented.') */
    }

    return (
        <>
        <SEO
                title="Регистрация в интернет-магазине Ваша Мебель"
                description="Интернет-магазин диванов в городе Новосибирске Ваша Мебель"
                keywords="недорогие диваны от производителя"
            />
            <div className={styles.login_page}>
                <div className={styles.form}>
                   <SignUpForm switchForm={swithForm} />
                </div>
            </div>
        </>
    )
}

export default RegisterPage