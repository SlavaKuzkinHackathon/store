import { $mode } from '@/context/mode'
import styles from '@/styles/auth/index.module.scss'
import { useStore } from 'effector-react'
import { useForm } from 'react-hook-form'
import { IInputs, ISignInFx } from '@/types/auth_f'
import EmailInput from '@/components/elements/AuthPage/EmailInput'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import { useAppDispatch, useAppSelector } from '@/hooks'
import router, { useRouter } from 'next/router'
import { userSlice } from '@/store /slices/userSlice'
import { AuthAsyncActionCreators } from '@/store /asyncActionCreators/auth'
import { useEffect, useState } from 'react'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const SignInForm = (): JSX.Element => {
  const [spinner, setSpinner] = useState(false)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const { error, isLogged } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  if (error) {
    alert(error)
    dispatch(userSlice.actions.setError(''))
  }

  useEffect(() => {
    if (isLogged) {
      router.back()
    }
  }, [isLogged])

  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>()

  const onSubmit = (data: ISignInFx) => {
    try {
      setSpinner(true)
      resetField('email')
      resetField('password')
      dispatch(AuthAsyncActionCreators.login(data.email, data.password))
    } catch (error) {
    } finally {
      setSpinner(false)
    }
  }

  return (
    <form className={styles.register_form} onSubmit={handleSubmit(onSubmit)}>
      <div className={`${styles.input} ${darkModeClass}`}>
        <EmailInput register={register} errors={errors} />
        <PasswordInput register={register} errors={errors} />
        <button className={`${styles.button} ${darkModeClass}`}>
          {spinner ? <div className={spinnerStyles.spinner} /> : ' Войти'}
        </button>
      </div>
    </form>
  )
}
export default SignInForm
