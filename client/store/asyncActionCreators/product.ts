import { CatalogAPI } from "@/app/api/catalog";
import { AppDispatch } from "..";
import { productSlice } from "../slices/productSlice";
import { ProductAPI } from "@/app/api/product";

export const ProductAsyncActionCreators = {
  fetchLimitProductsFromCatalog:
    (catalogId: number, page: number, limit: number, sorting?: string): any =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(productSlice.actions.setLoading());
        const response = await CatalogAPI.getLimitCatalogsProducts(
          catalogId,
          page,
          limit,
          sorting
        );
        dispatch(productSlice.actions.setProductsList(response.data));
      } catch (e: any) {
        alert(e.response?.data?.message);
      }
    },
  fetchAllProductsFromCatalog:
    (catalogId: number): any =>
    async (dispatch: AppDispatch) => {
      try {
        const response = await CatalogAPI.getAllCatalogsProducts(catalogId);
        dispatch(productSlice.actions.setRemovedProductsList(response.data));
      } catch (e: any) {
        alert(e.response?.data?.message);
      }
    },
  fetchNewAndPopularProducts: (): any => async (dispatch: AppDispatch) => {
    try {
      dispatch(productSlice.actions.setLoading());
      const response = await ProductAPI.getNoveltyAndPopular();
      dispatch(
        productSlice.actions.setNewProductsList(response.data.novelties)
      );
      dispatch(
        productSlice.actions.setPopularProductsList(response.data.populars)
      );
    } catch (e: any) {
      alert(e.response?.data?.message);
    }
  },
  createProduct:
    (formData: FormData): any =>
    async (dispatch: AppDispatch) => {
      try {
        const response = await ProductAPI.createOne(formData);
        alert(response.data);
      } catch (e: any) {
        alert(e.response?.data?.message);
      }
    },
  removeProduct:
    (id: number): any =>
    async (dispatch: AppDispatch) => {
      try {
        const response = await ProductAPI.deleteOne(id);
        dispatch(productSlice.actions.removeProduct({ id: +id }));
        alert(response.data);
      } catch (e: any) {
        alert(e.response?.data?.message);
      }
    },
};
