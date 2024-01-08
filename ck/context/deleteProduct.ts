import { ApiError } from "@/app/api/lib/ApiError";
import * as productsApi from '@/app/api/products'
import { createEffect, createEvent, createStore, sample } from "effector";
import { toast } from "react-toastify";

const deleteProductFx = createEffect<number, void, ApiError>(
    (productId: number) => {
      return productsApi.deleteProduct(productId);
    },
  );
  
  export const $isDeleting = createStore(false);
  
  export const deleteProduct = createEvent<number>('Delete product');
  
  sample({
    clock: deleteProduct,
    target: deleteProductFx,
  });
  
  $isDeleting.on(deleteProductFx, () => true);
  
  deleteProductFx.failData.watch((e) => toast.error(e.message));
  
  
  $isDeleting.on(deleteProductFx.finally, () => false);
  
  sample({
    clock: deleteProductFx.done
  });