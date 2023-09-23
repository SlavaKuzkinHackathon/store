import { IAuthPageInput } from '../../../types/auth_f'
import styles from '@/styles/auth.module.css'

const EmailInput = ({ register, errors }: IAuthPageInput) => (
  <label className={styles.label}>
    <input
      {...register('email', {
        required: 'Введите Email!',
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: 'Неправильный Email!',
        },
      })}
      className={styles.form_input}
      type="email"
      placeholder="Email"
    />
    {errors.email && (
      <span className={styles.error_alert}>{errors.email?.message}</span>
    )}
  </label>
)

export default EmailInput