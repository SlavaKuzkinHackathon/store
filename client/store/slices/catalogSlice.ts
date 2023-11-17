import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICatalog } from "../../interfaces";

export interface CatalogState {
  catalogList: ICatalog[];
  isLoading: boolean;
  removeCatalogList: ICatalog[];
}

const initialState: CatalogState = {
  catalogList: [],
  isLoading: true,
  removeCatalogList: [],
};

export const catalogSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<ICatalog[]>) => {
      state.catalogList = action.payload;
      state.isLoading = false;
    },
    addCatalog: (state, action: PayloadAction<ICatalog>) => {
      state.catalogList.push(action.payload);
    },
    removeCatalog: (state, action: PayloadAction<{ id: number }>) => {
      state.removeCatalogList = state.removeCatalogList.filter(
        (catalog) => catalog.id !== action.payload.id
      );
    },
  },
});

export const { setList, addCatalog, removeCatalog } = catalogSlice.actions;

export default catalogSlice.reducer;
