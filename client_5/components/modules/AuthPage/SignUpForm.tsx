import { useState } from 'react'
import Link from 'next/link'
import NameInput from '../../Elements/AuthPage/NameInput'
import { useForm } from 'react-hook-form'
import { IInputs } from '../../../types/auth_f'
import EmailInput from '../../Elements/AuthPage/EmailInput'
import PasswordInput from '../../Elements/AuthPage/PasswordInput'
import { signUpFx } from '../../../app/api/auth'
import { showAuthError } from '@/utils/errors'
import styles from '@/styles/auth.module.css'
import spinnerStyles from '@/styles/spinner/spinner_reg.module.css'


const SignUpForm = ({ switchForm }: { switchForm: () => void }) => {

    const [spinner, setSpinner] = useState(false)

    const { register, formState: { errors }, handleSubmit, resetField } = useForm<IInputs>()

    const onSubmit = async (data: IInputs) => {
        try {
            setSpinner(true)
            const userData = await signUpFx({
                url: '/users/signup',
                username: data.name,
                password: data.password,
                email: data.email
            })

            if (!userData) {
                return
            }

            resetField('name'),
                resetField('email'),
                resetField('password')
            switchForm()
        } catch (error) {
            showAuthError(error)
        } finally {
            setSpinner(false)
        }

    }

    return (
        <form className={styles.login_form} onSubmit={handleSubmit(onSubmit)}>
            <NameInput register={register} errors={errors} />
            <EmailInput register={register} errors={errors} />
            <PasswordInput register={register} errors={errors} />
            <button className={styles.form_button}>
                {spinner ? <div className={spinnerStyles.spinner} /> : 'Регистрация'}
            </button>
            <p className={styles.message}>Уже есть аккаунт?<Link href='./authPage'> Войти</Link></p>

        </form>

    )
}

export default SignUpForm