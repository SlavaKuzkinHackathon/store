
import Link from 'next/link'
import NameInput from '../../Elements/AuthPage/NameInput'
import { useForm } from 'react-hook-form'
import { IInputs } from '../../../types/auth_f'
import PasswordInput from '../../Elements/AuthPage/PasswordInput'
import { signInFx } from '../../../app/api/auth'
import { useState } from 'react'
import {showAuthError} from '@/utils/errors'
import styles from '@/styles/auth.module.css'
import spinnerStyles from '@/styles/spinner/spinner.module.css'

const SignInForm = () => {

    const [spinner, setSpinner] = useState(false)

    const { register, formState: { errors }, handleSubmit, resetField } = useForm<IInputs>()

    const onSubmit = async (data: IInputs) => {
        try {
            setSpinner(true)
            await signInFx({
                url: '/users/login',
                username: data.name,
                password: data.password,
            })
            resetField('name'),
                resetField('password')
        } catch (error) {
            showAuthError(error)
        } finally {
            setSpinner(false)
        }

    }

    return (
        <form className={styles.login_form} onSubmit={handleSubmit(onSubmit)}>
            <NameInput register={register} errors={errors} />
            <PasswordInput register={register} errors={errors} />
            <button className={styles.form_button}>
                {spinner ? <div className={spinnerStyles.spinner} /> : ' Войти'}
            </button>
            <p className={styles.message}>Нет аккаунта? <Link href='./registerPage'>Зарегистрироваться</Link></p>
        </form>

    )
}

export default SignInForm