
import { IAuthPageInput } from '../../../types/auth_f'
import styles from '@/styles/auth.module.css'


const NameInput = ({ register, errors }: IAuthPageInput) => {

    return (
        <label className={styles.label} >
            <input {...register('name', {
                required: 'Введите имя!',
                minLength: 2,
                maxLength: 15,
                pattern: {
                    value: /^[а-яА-Яa-zA-ZёЁ]*$/,
                    message: 'Недопустимое значение!',
                },
            })} className={styles.form_input} type="text" placeholder="Имя" />
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
}

export default NameInput