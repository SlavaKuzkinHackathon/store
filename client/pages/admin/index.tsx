import { Tabs } from 'antd'
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { RouteNames } from '../../routes'
import styles from '@/styles/admin/index.module.scss'
import { IProduct } from '../../interfaces'
import classNames from 'classnames'
import Section from '@/components/UI/Section'
import Button from '@/components/UI/Button'
import { ProductAsyncActionCreators } from '@/store/asyncActionCreators/product'
import { CatalogAsyncActionCreators } from '@/store/asyncActionCreators/catalog'

export default function AdminPage(): JSX.Element {
  const [productInfos, setProductInfos] = useState<
    { id: number; title: string; description: string }[]
  >([])
  const [imageFile, setImageFile] = useState<File | null>(null)

  const [isActive, setIsActive] = useState('orders')

  const [selectedCatalogId, setSelectedCatalogId] = useState<number>(0)
  const { isAdmin, isLogged } = useAppSelector((state) => state.user)
  const { catalogList } = useAppSelector((state) => state.catalog)
  const { removedProductsList } = useAppSelector((state) => state.products)

  const dispatch = useAppDispatch()
  const { push } = useRouter()

  useEffect(() => {
    if (!isLogged && !isAdmin) {
      push(RouteNames.HOST)
    }
    if (selectedCatalogId > 0) {
      dispatch(
        ProductAsyncActionCreators.fetchAllProductsFromCatalog(
          selectedCatalogId
        )
      )
    }
  }, [selectedCatalogId, isLogged, isAdmin])

  const addProductInfo = () => {
    setProductInfos([
      ...productInfos,
      { id: Date.now(), title: '', description: '' },
    ])
  }
  const validationAddCatalogSchema = yup.object().shape({
    catalog: yup.string().required('Введите имя каталога'),
  })
  const validationRemoveProductSchema = yup.object().shape({
    catalogId: yup.number().min(1, 'Выберите каталог'),
    productId: yup.number().min(1, 'Выберите товар'),
  })
  const validationAddProductSchema = yup.object().shape({
    catalogId: yup.number().min(1, 'Выберите каталог'),
    name: yup.string().required('Введите название товара'),
    price: yup
      .number()
      .positive('Цена не может быть отрицательной')
      .required('Введите цену товара'),
  })

  return (
    <>
      <section className={styles.admin}>
        <div className={styles.header}>
          <h1 className={styles.name}>АДМИНКА</h1>

          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${
                isActive === 'products' && styles.tab_active
              }`}
              onClick={() => setIsActive('goods')}
            >
              Товары
            </button>
            <button
              className={`${styles.tab} ${
                isActive === 'categories' && styles.tab_active
              }`}
              onClick={() => setIsActive('categories')}
            >
              Категории
            </button>
            <button
              className={`${styles.tab} ${
                isActive === 'orders' && styles.tab_active
              }`}
              onClick={() => setIsActive('orders')}
            >
              Заказы
            </button>
            <button
              className={`${styles.tab} ${
                isActive === 'users' && styles.tab_active
              }`}
              onClick={() => setIsActive('users')}
            >
              Пользователи
            </button>
          </div>
        </div>

    {/*     
        {isActive === 'products' && <ProdAdmin />}
        {isActive === 'categories' && <CategoriesAdmin />}
        {isActive === 'orders' && <OrdersAdmin />}
        {isActive === 'users' && <UsersAdmin />} */}
      </section>
    </>
  )
}
