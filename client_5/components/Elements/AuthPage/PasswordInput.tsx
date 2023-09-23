import { IAuthPageInput } from '../../../types/auth_f'
import styles from '@/styles/auth.module.css'

const PasswordInput = ({ register, errors }: IAuthPageInput) => (
  <label className={styles.label}>
    <input
      {...register('password', {
        required: 'Введите пароль!',
        minLength: 4,
        maxLength: 20,
      })}
      className={styles.form_input}
      type="password"
      placeholder="Password"
    />
    {errors.password && (
      <span className={styles.error_alert}>{errors.password?.message}</span>
    )}
    {errors.password && errors.password.type === 'minLength' && (
      <span className={styles.error_alert}>Минимум 4 символа!</span>
    )}
    {errors.password && errors.password.type === 'maxLength' && (
      <span className={styles.error_alert}>Не более 20 символов!</span>
    )}
  </label>
)

export default PasswordInput