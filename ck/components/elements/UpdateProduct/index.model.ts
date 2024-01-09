import { createEffect, createEvent, createStore, sample } from 'effector'
import * as productsApi from '@/app/api/products'
import { ApiError } from '@/app/api/lib'
import { toast } from 'react-toastify'

// Effects
export const updateProductFx = createEffect<
  productsApi.UpdateProductDTO,
  void,
  ApiError
>(async (product: productsApi.UpdateProductDTO) => {
  await productsApi.updateProduct(product)
})

// Events
export const updateProduct =
  createEvent<productsApi.UpdateProductDTO>('Update product')
export const productUpdated = updateProductFx.done

// Stores

sample({
  clock: updateProduct,
  target: updateProductFx,
})

updateProductFx.failData.watch((e) => toast.error(e.message))

/*
import { createEffect, createEvent, createStore, sample } from 'effector';

import * as categoriesApi from '@/src/shared/api/product-categories';
import { toast } from '@/src/shared/toasts';
import { ApiError } from '@/src/shared/api';

// Effects
const updateCategoryFx = createEffect<
  categoriesApi.UpdateCategoryDTO,
  void,
  ApiError
>(async (category: categoriesApi.UpdateCategoryDTO) => {
  await categoriesApi.updateCategory(category);
});

const deleteCategoryFx = createEffect<number, void, ApiError>(
  (categoryId: number) => {
    return categoriesApi.deleteCategory(categoryId);
  },
);

// Events
export const updateCategory =
  createEvent<categoriesApi.UpdateCategoryDTO>('Update category');
export const deleteCategory = createEvent<number>('Delete category');
export const categoryUpdated = updateCategoryFx.done;
export const categoryDeleted = deleteCategoryFx.done;

// Stores
export const $isDeleting = createStore(false);

sample({
  clock: updateCategory,
  target: updateCategoryFx,
});

updateCategoryFx.failData.watch((e) => toast.error(e.message));

sample({
  clock: deleteCategory,
  target: deleteCategoryFx,
});

$isDeleting.on(deleteCategoryFx, () => true);

deleteCategoryFx.failData.watch((e) => toast.error(e.message));

$isDeleting.on(deleteCategoryFx.finally, () => false);
*/
