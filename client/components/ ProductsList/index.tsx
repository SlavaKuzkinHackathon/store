import { useAppSelector } from '@/hooks'
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
