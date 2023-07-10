// libraries
import { createSlice } from '@reduxjs/toolkit';

// types
import { IProductsState } from '../../types/store';

const initialState: IProductsState = {
  products: [],
  currentProduct: null,
};

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
