import { getProductsFx } from '@/app/api/products'
import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { toast } from 'react-toastify'
import styles from '@/styles/admin/getProductsList.module.scss'
import { getImageURL } from '@/utils/getImageURL'
import { useEffect, useState } from 'react'
import { $products, setProducts } from '@/context/products'
import CreateProduct from '../CreateProduct'

const ProductsList = () => {
  const mode = useStore($mode)
  const products = useStore($products)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const data = await getProductsFx('/products')
      setProducts(data)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

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
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>₽{product.price}</td>
              <td>{product.in_stock}</td>
              <td>{product.rating}</td>
              <td>
                <a className={styles.image}>
                  <img src={getImageURL(product.image)} alt={product.name} />
                </a>
              </td>
              <td>
                <button>Изменить</button>
                <button>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <CreateProduct />
    </section>
  )
}

export default ProductsList
