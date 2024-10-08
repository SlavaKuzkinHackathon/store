import { useEffect } from 'react';
import { useStore, useUnit } from 'effector-react';
import { UpdateProductItem } from '../UpdateProduct/index';
import { $products, setProducts } from '@/context/products';
import { getProductsFx } from '@/app/api/products';
import { toast } from 'react-toastify'
import CreateProduct from '../CreateProduct';
import styles from '@/styles/admin/getProductsList.module.scss'

export const UpdateProductVid = () => {


  const products = useStore($products)
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

  return (
    <div>
      <CreateProduct />
      <h2>Диваны</h2>
<table>

</table>
      <ul className={styles.ul}>
        {products.map((product) => (
          <UpdateProductItem key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};

/* import { useEffect } from 'react';

import { useUnit } from 'effector-react';

import {
  $products,
  $productsCount,
  $isPending,
  $pageNumber,
  $pageSize,
  $searchQuery,
  loadPage,
  mounted,
  searchQueryChanged,
} from './index.model';

import { Paper } from '@/components/ui/atoms/Paper';
import { Input } from '@/components/ui/atoms/Input';
import { Paginator } from '@/components/elements/Paginator';
import { Preloader } from '@/components/ui/molecules/Preloader';
import { UpdateProductItem } from '../UpdateProduct/index';

export const UpdateProductVid = () => {
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

  return (
    <Paper>
      <h2>Products</h2>
      <Input
        value={searchQuery}
        onChange={(e) => searchQueryChangedEvent(e.target.value)}
        className="mt-3"
      />

      <Preloader isLoading={isPending}>
        <ul>
          {products.map((product) => (
            <UpdateProductItem key={product.id} product={product} />
          ))}
        </ul>

        {products.length === 0 && <p>No Categories</p>}
      </Preloader>

      <Paginator
        pageSize={pageSize}
        currentPage={pageNumber}
        count={productsCount}
        onPageSelect={loadPageEvent}
      />
    </Paper>
  );
}; */

/* import { useEffect } from 'react';
import { useStore, useUnit } from 'effector-react';
import { UpdateProductItem } from '../UpdateProduct/index';
import { $products, setProducts } from '@/context/products';
import { getProductsFx } from '@/app/api/products';
import { toast } from 'react-toastify'

export const UpdateProductVid = () => {


  const products = useStore($products)
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

  return (
    <div>
      <h2>Products</h2>

      <ul>
        {products.map((product) => (
          <UpdateProductItem key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}; */




/*
import { useEffect } from 'react';

import { useUnit } from 'effector-react';

import {
  $products,
  $productsCount,
  $isPending,
  $pageNumber,
  $pageSize,
  $searchQuery,
  loadPage,
  mounted,
  searchQueryChanged,
} from './index.model';

import { Paper } from '@/components/ui/atoms/Paper';
import { Input } from '@/components/ui/atoms/Input';
import { Paginator } from '@/components/elements/Paginator';
import { Preloader } from '@/components/ui/molecules/Preloader';
import { UpdateProductItem } from '../UpdateProduct/index';

export const UpdateProductVid = () => {
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

  return (
    <Paper>
      <h2>Products</h2>
      <Input
        value={searchQuery}
        onChange={(e) => searchQueryChangedEvent(e.target.value)}
        className="mt-3"
      />

      <Preloader isLoading={isPending}>
        <ul>
          {products.map((product) => (
            <UpdateProductItem key={product.id} product={product} />
          ))}
        </ul>

        {products.length === 0 && <p>No Categories</p>}
      </Preloader>

      <Paginator
        pageSize={pageSize}
        currentPage={pageNumber}
        count={productsCount}
        onPageSelect={loadPageEvent}
      />
    </Paper>
  );
};

*/




/*
import { useEffect } from 'react';

import { useUnit } from 'effector-react';

import {
  $categories,
  $categoriesCount,
  $isPending,
  $pageNumber,
  $pageSize,
  $searchQuery,
  loadPage,
  mounted,
  searchQueryChanged,
} from './index.model';

import { Paper } from '@/src/ui/atoms/Paper';
import { Input } from '@/src/ui/atoms/Input';
import { H2 } from '@/src/ui/atoms/Typography';
import { Paginator } from '@/src/ui/molecules/Paginator';
import { NoResults } from '@/src/ui/atoms/NoResults';
import { Preloader } from '@/src/ui/molecules/Preloader';
import { ProductCategoryItem } from './ProductCategoryItem';

export const CategoriesWidget = () => {
  const [
    categories,
    categoriesCount,
    pageSize,
    pageNumber,
    searchQuery,
    isPending,
  ] = useUnit([
    $categories,
    $categoriesCount,
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

  return (
    <Paper>
      <H2>Product Categories</H2>
      <Input
        value={searchQuery}
        onChange={(e) => searchQueryChangedEvent(e.target.value)}
        className="mt-3"
      />

      <Preloader isLoading={isPending}>
        <ul>
          {categories.map((category) => (
            <ProductCategoryItem key={category.id} category={category} />
          ))}
        </ul>

        {categories.length === 0 && <NoResults>No Categories</NoResults>}
      </Preloader>

      <Paginator
        pageSize={pageSize}
        currentPage={pageNumber}
        count={categoriesCount}
        onPageSelect={loadPageEvent}
      />
    </Paper>
  );
};
*/