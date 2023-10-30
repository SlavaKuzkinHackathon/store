import NameInput from '@/components/elements/AuthPage/NameInput'
import { $mode } from '@/context/mode'
import styles from '@/styles/auth/index.module.scss'
import { useStore } from 'effector-react'
import { useForm } from 'react-hook-form'
import { IInputs } from '@/types/auth_f'
import EmailInput from '@/components/elements/AuthPage/EmailInput'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { useRouter } from 'next/router'
import {userSlice} from '@/store /slices/userSlice'
import { RouteNames } from '@/routes'
import { AuthAsyncActionCreators } from '@/store /asyncActionCreators/auth'

/* interface InputValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
} */

const SignUpForm = (): JSX.Element => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  /** */
  //const { error, isLogged } = useAppSelector((state) => state.user);
  /* const dispatch = useAppDispatch();
  const { push } = useRouter(); */
/*   if (error) {
    alert(error);
    dispatch(userSlice.actions.setError(""));
  } 
  if (isLogged) {
    push(RouteNames.HOST);
  } */
  /** */

  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>()

  const onSubmit = (data: IInputs) => {
    resetField('name')
    resetField('email')
    resetField('password')
    console.log(data)
    AuthAsyncActionCreators.registration(data.name,
      data.email,
      data.password)
    
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

/**template */

/* import NameInput from '@/components/elements/AuthPage/NameInput'
import { $mode } from '@/context/mode'
import styles from '@/styles/auth/index.module.scss'
import { useStore } from 'effector-react'
import { useForm } from 'react-hook-form'
import { IInputs } from '@/types/auth_f'
import EmailInput from '@/components/elements/AuthPage/EmailInput'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'

const SignUpForm = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>()

  const onSubmit = (data: IInputs) => {
    resetField('name')
    resetField('email')
    resetField('password')
    console.log(data)
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
export default SignUpForm */

/** */

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
