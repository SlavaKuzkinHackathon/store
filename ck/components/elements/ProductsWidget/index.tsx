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
import { ProductItem } from './ProductItem';

export const ProductsWidget = () => {
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


  console.log('products' , ProductItem)
  

  return (
    <Paper>
      <h2>Продукция</h2>
      <Input
        value={searchQuery}
        onChange={(e) => searchQueryChangedEvent(e.target.value)}
        className="mt-3"
      />

      <Preloader isLoading={isPending}>
        <ul>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </ul>

        {products.length === 0 && <p>отсутствуют результаты</p>}
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