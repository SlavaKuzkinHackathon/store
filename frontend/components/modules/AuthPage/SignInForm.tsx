import NameInput from '@/components/elements/AuthPage/NameInput'
import { $mode } from '@/context/mode'
import styles from '@/styles/auth/index.module.scss'
import { useStore } from 'effector-react'
import { useForm } from 'react-hook-form'
import { IInputs } from '@/types/auth'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import { singInFx } from '@/app/api/auth'
import { showAuthError } from '@/utils/errors'
import { useState } from 'react'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { useRouter } from 'next/router'

const SignInForm = () => {
  const [spinner, setSpinner] = useState(false)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>()
  const route = useRouter()

  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true)
       await singInFx({
        url: '/users/login',
        password: data.password,
        username: data.name,
      })
      
      resetField('name')
      resetField('password')
      route.push('/')
    } catch (error) {
      showAuthError(error)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <form className={styles.register_form} onSubmit={handleSubmit(onSubmit)}>
      <div className={`${styles.input} ${darkModeClass}`}>
        <NameInput register={register} errors={errors} />
        <PasswordInput register={register} errors={errors} />
        <button className={`${styles.button} ${darkModeClass}`}>
          {spinner ? <div className={spinnerStyles.spinner} /> : ' Войти'}
        </button>
      </div>
    </form>
  )
}
export default SignInForm
