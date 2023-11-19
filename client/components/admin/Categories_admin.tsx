import { useAppDispatch, useAppSelector } from '@/hooks'
import { CatalogAsyncActionCreators } from '@/store/asyncActionCreators/catalog'
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import Button from '@/components/UI/Button/index'
import * as yup from 'yup'
import styles from '@/styles/admin/Admin.module.scss'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const CategoriesAdmin = () => {
  const { catalogList } = useAppSelector((state) => state.catalog)

  const [action, setAction] = useState(false)

  const dispatch = useAppDispatch()

  const validationAddCatalogSchema = yup.object().shape({
    catalog: yup.string().required('Введите имя новой категории'),
  })

  return (
    <div className="">
      <h1>Категории</h1>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Категория</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {catalogList.map((catalog) => (
            <tr key={catalog.id}>
              <td>{catalog.id}</td>
              <td>{catalog.name}</td>
              <td>
                <Link href={'/'} passHref legacyBehavior>
                  <button>Изменить</button>
                </Link>
                  <button
                    onClick={() => {
                      dispatch(
                        CatalogAsyncActionCreators.removeCatalog(catalog.id)
                      )
                    }}
                  >
                    Удалить
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Formik
        initialValues={{
          catalog: '',
        }}
        validateOnBlur
        validationSchema={validationAddCatalogSchema}
        onSubmit={(
          values,
          formikHelpers: FormikHelpers<{ catalog: string }>
        ) => {
          dispatch(CatalogAsyncActionCreators.createCatalog(values.catalog))
          formikHelpers.resetForm()
          formikHelpers.setSubmitting(false)
        }}
      >
        {({
          handleChange,
          handleBlur,
          touched,
          errors,
          values,
          isSubmitting,
        }: FormikProps<{ catalog: string }>) => (
          <Form>
            <div className={styles.warning}>
              {errors.catalog && touched.catalog && errors.catalog}
            </div>

            <Field
              className={styles.input}
              type={`text`}
              name={`catalog`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.catalog}
              placeholder={'Введите имя новой категории'}
            />
            <div className="buttonBox">
              <Button type="submit" disabled={isSubmitting}>
                + Добавить категорию
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
export default CategoriesAdmin
