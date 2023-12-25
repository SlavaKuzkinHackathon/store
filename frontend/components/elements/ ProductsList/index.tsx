import { getProductsFx } from '@/app/api/products'
import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { toast } from 'react-toastify'
import styles from '@/styles/admin/getProductsList.module.scss'
import { getImageURL } from '@/utils/getImageURL'
import { useEffect, useState } from 'react'
import { $products, setProducts } from '@/context/products'
import { IProducts } from '@/types/products'

const ProductsList = () => {
  const mode = useStore($mode)
  const products = useStore($products)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  useEffect(() => {
    loadProducts()
  }, [])

  console.log(products)

  const loadProducts = async () => {
    try {
      const data = await getProductsFx('/product')
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
              <td>₽{product.price}</td>
              <td>{product.in_stock}</td>
              <td>{product.rating}</td>
              <td>
                <a className={styles.image}>
                  <img src={getImageURL(product.images)} alt={product.name} />
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
      <div></div>
    </section>
  )
}

export default ProductsList

/* import { useAppSelector } from '@/hooks'
import { getImageURL } from '@/utils'
import styles from '@/styles/admin/ProductList.module.scss'
import CreateProduct from '../CreateProduct'
import Link from 'next/link'

const ProductsList: React.FC = () => {
  const { allProductsList } = useAppSelector((state) => state.products)

  return (
    <>

      <h1>Диваны</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Категория</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Рейтинг</th>
            <th>Фото</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {allProductsList.map((_product) => (
            <tr key={_product.id}>
              <td >{_product.id}</td>
              <td>{_product.catalogId}</td>
              <td>{_product.name}</td>
              <td>₽{_product.price}</td>
              <td>{_product.rating}</td>
              <td>
                <a className={styles.image}>
                  <img src={getImageURL(_product.image)} alt={_product.name} />
                </a>
              </td>
              <td>
               <Link
                href={`/admin/products/edit/${_product.id}`}
                passHref
              >
                <button>Изменить</button>
              </Link>
                <button>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <CreateProduct />
      </div>
    </>
  )
}

export default ProductsList
 */
