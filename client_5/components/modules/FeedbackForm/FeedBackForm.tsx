
import { useForm } from 'react-hook-form'
import styles from '../../../src/styles/feedbackForm/index.module.scss'
import NameInput from './NameInpurt'
import { FeedbackInputs } from '../../../types/feedbackForm'
import PhoneInput from './PhoneInput'
import EmailInput from './EmailInput'
import MessageInput from './MessageInput'
import { MutableRefObject, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import spinnerStyles from '../../../src/styles/spinner/spinner.module.css'
import { toast } from 'react-toastify'

const FeedbackForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FeedbackInputs>()

    const [spinner, setSpinner] = useState(false)
    const formRef = useRef() as MutableRefObject<HTMLFormElement>

    const submitForms = () => {
        setSpinner(true)
        emailjs.sendForm('service_9gs8t4j',
            'template_rfoo6c5',
            formRef.current,
            'AHq8Cy6FLVaGjte58'
        ).then((result) => {
            setSpinner(false)
            toast.success(`Сообщение отправлено! ${result.text}`)
        }).catch((error) => {
            setSpinner(false)
            toast.success(`Что-то пошло не так! ${error.text}`)
        })
        formRef.current.reset()
    }


    return (
        <div className={styles.feedback_form}>
            <h3 className={styles.feedback_form__title}>
                Форма обратной связи
            </h3>
            <form
                ref={formRef}
                className={styles.feedback_form__form}
                onSubmit={handleSubmit(submitForms)}>
                <NameInput
                    register={register}
                    errors={errors}
                />
                <PhoneInput
                    register={register}
                    errors={errors}
                />
                <EmailInput
                    register={register}
                    errors={errors}
                />
                <MessageInput
                    register={register}
                    errors={errors}
                />
                <div className={styles.feedback_form__form__btn}>
                    <button>
                        {spinner ? (
                            <span
                                className={spinnerStyles.spinner}
                                style={{ top: '6px', left: '47%' }}
                            />
                        ) : (
                            'Отправить сообщение'
                        )}
                    </button>
                </div>
            </form >
        </div >
    )

}

export default FeedbackForm