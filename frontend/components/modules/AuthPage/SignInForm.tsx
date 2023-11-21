import NameInput from '@/components/elements/AuthPage/NameInput'
import { $mode } from '@/context/mode'
import styles from '@/styles/auth/index.module.scss'
import { useStore } from 'effector-react'
import { useForm } from 'react-hook-form'
import { IInputs } from '@/types/auth'
import EmailInput from '@/components/elements/AuthPage/EmailInput'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import { singInFx} from '@/app/api/auth'
import { toast } from 'react-toastify'

const SignInForm = () => {
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
      const userData = await singInFx({
        url: '/auth/login',
        password: data.password,
        email: data.email,
      })
      console.log(userData)

      resetField('email')
      resetField('password')
      
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <form className={styles.register_form} onSubmit={handleSubmit(onSubmit)}>
      <div className={`${styles.input} ${darkModeClass}`}>
        <EmailInput register={register} errors={errors} />
        <PasswordInput register={register} errors={errors} />
        <button className={`${styles.button} ${darkModeClass}`}>
          Войти
        </button>
      </div>
    </form>
  )
}
export default SignInForm
