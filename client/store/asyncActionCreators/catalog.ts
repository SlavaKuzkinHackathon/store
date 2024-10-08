import { CatalogAPI } from "@/app/api/catalog";
import { AppDispatch } from "..";
import { catalogSlice } from "../slices/catalogSlice";

export const CatalogAsyncActionCreators = {
  fetchAll: (): any => async (dispatch: AppDispatch) => {
    try {
      const response = await CatalogAPI.getAll();
      dispatch(catalogSlice.actions.setList(response.data));
    } catch (e: any) {
      console.log(e.response?.data?.massage);
    }
  },
  createCatalog:
    (name: string): any =>
    async (dispatch: AppDispatch) => {
      try {
        const response = await CatalogAPI.createCatalog(name);
        dispatch(catalogSlice.actions.addCatalog(response.data));
        alert(`Каталог ${response.data.name} успешно добавлен`);
      } catch (e: any) {
        alert(e.response?.data?.massage);
      }
    },
    removeCatalog:
    (id: number): any => 
    async (dispath: AppDispatch) => {
      try {
        const response = await CatalogAPI.deleteOne(id)
        dispath(catalogSlice.actions.removeCatalog({id: +id}))
        alert(response.data)
      } catch (e:any) {
        alert(e.response?.data?.message)
      }
    }
};
