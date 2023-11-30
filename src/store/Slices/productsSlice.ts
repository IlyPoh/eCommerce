// IMPORTS
// libraries
import { createSlice } from '@reduxjs/toolkit';

// types
import { ESort } from '../../types';
import { IProductsState } from '../../types/store';

// INITIAL STATE

const initialState: IProductsState = {
  products: {
    productsData: [],
    totalPages: 0,
  },
  categories: [],
  subcategories: [],
  brands: [],
  sort: ESort.POPULAR,
  filters: {
    rating: [],
    prices: null,
    tags: [],
    brands: [],
    country: null,
  },
  brandsToFilter: [],
  ratingToFilter: [],
  pricesToFilter: [],
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
    setTags: (state, action) => {
      state.filters.tags = action.payload;
    },
    removeTag: (state, action) => {
      state.filters.tags = state.filters.tags.filter(
        (tag) => tag !== action.payload
      );
    },
    setCountry: (state, action) => {
      state.filters.country = action.payload;
    },
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
    setBrandsToFilter: (state, action) => {
      state.brandsToFilter = action.payload;
    },
    setRatingToFilter: (state, action) => {
      state.ratingToFilter = action.payload;
    },
    setpricesToFilter: (state, action) => {
      state.pricesToFilter = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.brandsToFilter = initialState.brandsToFilter;
      state.ratingToFilter = initialState.ratingToFilter;
      state.pricesToFilter = initialState.pricesToFilter;
    },
  },
});

export const {
  setProducts,
  setProductCategories,
  setProductSubcategories,
  setSort,
  setFilters,
  setTags,
  removeTag,
  setCountry,
  setBrands,
  setBrandsToFilter,
  setRatingToFilter,
  setpricesToFilter,
  resetFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
