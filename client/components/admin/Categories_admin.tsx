import styles from '@/styles/admin/Categories_admin.module.scss'
import { useState, useEffect } from 'react'
import Input from '@/components/UI/Inputs/Input'
import axios from 'axios'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { useForm } from 'react-hook-form'
import { ITextInputs } from '@/types/input'

const CategoriesAdmin = () => {
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
    <>
      <form>
        <p className={styles.addcat_title}>Создать категорию</p>
        <Input register={register} errors={errors} />
        <button className={`${styles.button} ${darkModeClass}`}>
          {spinner ? <div className={spinnerStyles.spinner} /> : 'Создать'}
        </button>
      </form>
    </>
  )
}

export default CategoriesAdmin
