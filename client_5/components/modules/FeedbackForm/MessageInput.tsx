import { IFeedbackInput } from "../../../types/feedbackForm"
import styles from '../../../src/styles/feedbackForm/index.module.scss'


const MessageInput = ({ register, errors }: IFeedbackInput) => (
    <label className={styles.feedback_form__form__label}>
      <textarea
        className={styles.feedback_form__form__textarea}
        placeholder="Введите ваше сообщение (от 20 до 300 символов)"
        {...register('message', {
          required: 'Введите сообщение!',
          minLength: 20,
          maxLength: 300,
        })}
      />
      {errors.message && (
        <span className={styles.error_alert}>{errors.message?.message}</span>
      )}
      {errors.message && errors.message.type === 'minLength' && (
        <span className={styles.error_alert}>Минимум 20 символов!</span>
      )}
      {errors.message && errors.message.type === 'maxLength' && (
        <span className={styles.error_alert}>Не более 300 символов!</span>
      )}
    </label>
  )
  
  export default MessageInput