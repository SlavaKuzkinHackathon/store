import { $mode } from '@/context/mode'
import styles from '@/styles/ui/input.module.scss'
import { IAuthTextInput } from '@/types/input'
import { useStore } from 'effector-react'

const Input = ({ register, errors }: IAuthTextInput) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  
  return (
    <label className={styles.wrapper}>
      <input
        {...register('textInput', {
          required: 'Введите пароль!',
          minLength: 2,
          maxLength: 30,
        })}
        //className={styles.}
        type='text'
        placeholder='Название категории'
      />
      {errors.textInput && (
        <span className={styles.error_alert}>{errors.textInput?.message}</span>
      )}
      {errors.textInput && errors.textInput.type === 'minLength' && (
        <span className={styles.error_alert}>Минимум 2 символа!</span>
      )}
      {errors.textInput && errors.textInput.type === 'maxLength' && (
        <span className={styles.error_alert}>Не более 30 символов!</span>
      )}
      <span className={styles.icon}></span>
    </label>
  )
}

export default Input
