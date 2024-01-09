import { getProductsFx } from '@/app/api/products'
import { $mode } from '@/context/mode'
import { useStore, useUnit } from 'effector-react'
import { toast } from 'react-toastify'
import styles from '@/styles/admin/getProductsList.module.scss'
import { getImageURL } from '@/utils/getImageURL'
import { useEffect, useState } from 'react'
import { $products, setProducts } from '@/context/products'
import CreateProduct from '../CreateProduct/index'
import { $isDeleting, deleteProduct } from '@/context/deleteProduct'
import UpdateProductItem from '../UpdateProduct'

const ProductsList = () => {
  const mode = useStore($mode)
  const products = useStore($products)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const loadProducts = async () => {
    try {
      const data = await getProductsFx('/products')
      setProducts(data)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const [isDeleting, deleteProductEvent] = useUnit([$isDeleting, deleteProduct])

  return (
    <section>
      <h1>Диваны</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Описание</th>
            <th>Цена</th>
            <th>Количество</th>
            <th>Рейтинг</th>
            <th>Фото</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map((_product) => (
            <tr key={_product.id}>
              <td>{_product.id}</td>
              <td>{_product.name}</td>
              <td>{_product.description}</td>
              <td>₽{_product.price}</td>
              <td>{_product.in_stock}</td>
              <td>{_product.rating}</td>
              <td>
                <a className={styles.image}>
                  <img src={getImageURL(_product.image)} alt={_product.name} />
                </a>
              </td>
              <td>
                <button
                  onClick={() => {
                    <UpdateProductItem key={_product.id} product={_product} />
                  }}
                >
                  Изменить
                </button>
                <button
                  onClick={() => {
                    deleteProductEvent(_product.id)
                  }}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <CreateProduct />
      <br />
      <div>
        <ul>
          {products.map((prod) => (
            <UpdateProductItem key={prod.id} product={prod} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ProductsList
