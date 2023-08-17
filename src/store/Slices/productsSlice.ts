// IMPORTS
// libraries
import { createSlice } from '@reduxjs/toolkit';

// types
import { IProductsState } from '../../types/store';

// INITIAL STATE
const initialState: IProductsState = {
  products: [],
  categories: [],
};

// SLICE
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProductCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { setProducts, setProductCategories } = productsSlice.actions;

export default productsSlice.reducer;
