import NameInput from '@/components/elements/AuthPage/NameInput'
import { $mode } from '@/context/mode'
import styles from '@/styles/auth/index.module.scss'
import { useStore } from 'effector-react'
import { useForm } from 'react-hook-form'
import { IInputs, ISignUpFx } from '@/types/auth_f'
import EmailInput from '@/components/elements/AuthPage/EmailInput'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { useRouter } from 'next/router'
import { userSlice } from '@/store/slices/userSlice'
import { RouteNames } from '@/routes'
import { AuthAsyncActionCreators } from '@/store/asyncActionCreators/auth'
import { useState } from 'react'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const SignUpForm = (): JSX.Element => {
  const [spinner, setSpinner] = useState(false)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const { error, isLogged } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const { push } = useRouter()
  if (error) {
    alert(error)
    dispatch(userSlice.actions.setError(''))
  }
  if (isLogged) {
    push(RouteNames.HOST)
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>()

  const onSubmit = (data: ISignUpFx) => {
    try {
      setSpinner(true)
      resetField('name')
      resetField('email')
      resetField('password')
      dispatch(
        AuthAsyncActionCreators.registration(
          data.name,
          data.email,
          data.password
        )
      )
    } catch (error) {
    } finally {
      setSpinner(false)
    }
  }

  return (
    <form className={styles.register_form} onSubmit={handleSubmit(onSubmit)}>
      <div className={`${styles.input} ${darkModeClass}`}>
        <NameInput register={register} errors={errors} />
        <EmailInput register={register} errors={errors} />
        <PasswordInput register={register} errors={errors} />
        <button className={`${styles.button} ${darkModeClass}`}>
        {spinner ? <div className={spinnerStyles.spinner} /> : 'Регистрация'}
        </button>
      </div>
    </form>
  )
}
export default SignUpForm
