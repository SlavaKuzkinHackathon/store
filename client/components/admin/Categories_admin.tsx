import { useState, useEffect } from 'react'
import Input from '@/components/UI/Inputs/Input'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { useForm } from 'react-hook-form'
import { ITextInputs } from '@/types/input'
import styles from '@/styles/ui/input.module.scss'

const CategoriesAdmin = (): JSX.Element => {
  const [spinner, setSpinner] = useState(false)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<ITextInputs>()

  return (
    <div className={styles.login_page}>
      <div className={`${styles.form} ${darkModeClass}`}>
        <form className={styles.register_form}>
          <div className={`${styles.input} ${darkModeClass}`}>
            <p>Создать категорию</p>
            <Input register={register} errors={errors} />
            <button className={`${styles.button} ${darkModeClass}`}>
              {spinner ? <div className={spinnerStyles.spinner} /> : 'Создать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CategoriesAdmin
