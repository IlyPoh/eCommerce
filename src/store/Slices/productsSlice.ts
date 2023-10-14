// IMPORTS
// libraries
import { createSlice } from '@reduxjs/toolkit';

// types
import { ESort } from '../../types';
import { IProductsState } from '../../types/store';

// INITIAL STATE

const initialState: IProductsState = {
  products: [],
  categories: [],
  subcategories: [],
  sort: ESort.POPULAR,
  filters: [],
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
    setProductSubcategories: (state, action) => {
      state.subcategories = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    removeFilter: (state, action) => {
      state.filters = state.filters.filter((item) => item !== action.payload);
    },
  },
});

export const {
  setProducts,
  setProductCategories,
  setProductSubcategories,
  setSort,
  setFilters,
  removeFilter,
} = productsSlice.actions;

export default productsSlice.reducer;
