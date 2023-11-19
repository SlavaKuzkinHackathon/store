import { useAppSelector } from '@/hooks'
import { ICatalogProductsResponse, IProduct } from '@/interfaces'
import Link from 'next/link'

const ProductsList:React.FC = () => {

  const { productsList, newProductsList, allProductsList } = useAppSelector((state) => state.products)
  return (
    <>
      <h1>Диваны</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Категория</th>
            <th>Название</th>
            <th>Цена</th>
            {/* <th>Доп.инф</th> */}
            <th>Рейтинг</th>
            {/* <th>Звезды</th> */}
          </tr>
        </thead>
        <tbody>
          {allProductsList.map((_product) => (
            <tr key={_product.id}>
              <td>{_product.id}</td>
              <td>{_product.catalogId}</td>
              <td>{_product.name}</td>
              <td>₽{_product.price}</td>
              {/* <td>{_product.productInfo}</td> */}
              <td>{_product.rating}</td>
              {/* <td>{_product?.reviews}</td> */}
              <td>
                <Link href={`/`} passHref legacyBehavior>
                  <button>Изменить</button>
                </Link>
                <button>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ProductsList
