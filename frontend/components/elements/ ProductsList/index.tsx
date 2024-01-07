import { useEffect } from 'react';

import { IProduct } from '@/types/product'

import { useUnit } from 'effector-react';

import { getImageURL } from '@/utils/getImageURL';

import {
  $products,
  $productsCount,
  $isDeleting,
  $isPending,
  $pageNumber,
  $pageSize,
  $searchQuery,
  deleteProduct,
  loadPage,
  mounted,
  searchQueryChanged,
} from './index.model';

import Image from 'next/image';
import CreateProduct from '../CreateProduct';
import { Paginator } from '../Paginator';
/* import { Paper } from '@/src/ui/atoms/Paper';
import { Input } from '@/src/ui/atoms/Input';
import { Button } from '@/src/ui/atoms/Button';
import { H2 } from '@/src/ui/atoms/Typography';
import { NoResults } from '@/src/ui/atoms/NoResults';
import { MonetaryValue } from '@/src/ui/atoms/MonetaryValue';
import { Paginator } from '@/src/ui/molecules/Paginator';
import { Preloader } from '@/src/ui/molecules/Preloader'; */

const ProductsList = () => {
  const [
    products,
    productsCount,
    pageSize,
    pageNumber,
    searchQuery,
    isPending,
  ] = useUnit([
    $products,
    $productsCount,
    $pageSize,
    $pageNumber,
    $searchQuery,
    $isPending,
  ]);

  const [mountedEvent, searchQueryChangedEvent, loadPageEvent] = useUnit([
    mounted,
    searchQueryChanged,
    loadPage,
  ]);

  useEffect(() => {
    mountedEvent();
  }, [mountedEvent]);

  console.log('products', products)
  
  return (
    <section>
      <h1>Products</h1>

      <input
        value={searchQuery}
        onChange={(e) => searchQueryChangedEvent(e.target.value)}
        className="mt-3"
      />

       <div>
        <ul>
          {products.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </ul>

        {products.length === 0 && <p>No products</p>}
      </div> 

       <Paginator
        pageSize={pageSize}
        currentPage={pageNumber}
        count={productsCount}
        onPageSelect={loadPageEvent}
      /> 
      <br />
      <CreateProduct />
    </section>
  );
};

type ProductListItemProps = {
  product: IProduct;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  const [isDeleting, deleteProductEvent] = useUnit([
    $isDeleting,
    deleteProduct,
  ]);

  return (
    <li className="flex items-center py-4 gap-2">
      <Image src={getImageURL(product.image)} alt={product.name} width={60} height={60} />
      <div>{product.name}</div>
      <div>
        ₽{product.price}
      </div>

      <div className="ml-auto">
        <button
          onDoubleClick={() => {
            deleteProductEvent(product.id);
          }}
        //isLoading={isDeleting}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default ProductsList

/* import { getProductsFx } from '@/app/api/products'
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
 */