import { $mode } from '@/context/mode'
import styles from '@/styles/ui/input.module.scss'
import { IAuthPageInput } from '@/types/auth_f'
import { useStore } from 'effector-react'

const Input = ({ register, errors }: IAuthPageInput) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  
  return (
    <label className={styles.wrapper}>
      <input
        {...register('password', {
          required: 'Введите пароль!',
          minLength: 4,
          maxLength: 30,
        })}
        //className={styles.}
        type='text'
        placeholder='Название категории'
      />
      {errors.password && (
        <span className={styles.error_alert}>{errors.password?.message}</span>
      )}
      {errors.password && errors.password.type === 'minLength' && (
        <span className={styles.error_alert}>Минимум 2 символа!</span>
      )}
      {errors.password && errors.password.type === 'maxLength' && (
        <span className={styles.error_alert}>Не более 30 символов!</span>
      )}
      <span className={styles.icon}></span>
    </label>
  )
}

export default Input
