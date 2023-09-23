import { IFeedbackInput } from "../../../types/feedbackForm"
import styles from '../../../src/styles/feedbackForm/index.module.scss'

const NameInput = ({ register, errors }: IFeedbackInput) => (
  <label className={styles.feedback_form__form__label}>
    <span>Имя *</span>
    <input
      className={styles.feedback_form__form__input}
      type="text"
      placeholder="Илья"
      {...register('name', {
        required: 'Введите Имя!',
        pattern: {
          value: /^[а-яА-Яa-zA-ZёЁ]*$/,
          message: 'Недопустимое значение',
        },
        minLength: 2,
        maxLength: 15,
      })}
    />
    {errors.name && (
      <span className={styles.error_alert}>{errors.name?.message}</span>
    )}
    {errors.name && errors.name.type === 'minLength' && (
      <span className={styles.error_alert}>Минимум 2 символа!</span>
    )}
    {errors.name && errors.name.type === 'maxLength' && (
      <span className={styles.error_alert}>Не более 15 символов!</span>
    )}
  </label>
)

export default NameInput