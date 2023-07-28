// IMPORTS
// libraries
import { createSlice } from '@reduxjs/toolkit';

// types
import { IProductsState } from '../../types/store';

// INITIAL STATE
const initialState: IProductsState = {
  products: [],
  currentProduct: null,
};

// SLICE
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
