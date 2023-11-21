import NameInput from '@/components/elements/AuthPage/NameInput'
import { $mode } from '@/context/mode'
import styles from '@/styles/auth/index.module.scss'
import { useStore } from 'effector-react'
import { useForm } from 'react-hook-form'
import { IInputs } from '@/types/auth'
import EmailInput from '@/components/elements/AuthPage/EmailInput'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import { singUpFx } from '@/app/api/auth'
import { toast } from 'react-toastify'

const SignUpForm = ({ switchForm }: { switchForm: () => void }) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>()

  const onSubmit = async (data: IInputs) => {
    try {
      const userData = await singUpFx({
        url: '/auth/registration',
        name: data.name,
        password: data.password,
        email: data.email,
      })


      console.log(userData)

      resetField('name')
      resetField('email')
      resetField('password')
      switchForm()
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <form className={styles.register_form} onSubmit={handleSubmit(onSubmit)}>
      <div className={`${styles.input} ${darkModeClass}`}>
        <NameInput register={register} errors={errors} />
        <EmailInput register={register} errors={errors} />
        <PasswordInput register={register} errors={errors} />
        <button className={`${styles.button} ${darkModeClass}`}>
          Регистрация
        </button>
      </div>
    </form>
  )
}
export default SignUpForm

/* import { useState } from 'react'
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


const SignUpForm = ({ switchForm }: { switchForm: () =>  void })=> {

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

export default SignUpForm */
