import { IAuthPageInput } from '@/types/auth_f'
import styles from '@/styles/auth/index.module.scss'
import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'

const EmailInput = ({ register, errors }: IAuthPageInput) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  return (
    <label className={styles.label}>
      <input
        {...register('email', {
          required: 'Введите Email!',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Неправильный Email!',
          },
        })}
        className={`${styles.input} ${darkModeClass}`}
        type="email"
        placeholder="Email"
      />
      {errors.email && (
        <span className={styles.error_alert}>{errors.email?.message}</span>
      )}
    </label>
  )
}

export default EmailInput
