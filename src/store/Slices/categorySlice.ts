// IMPORTS
// libraries
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// types
import { ICategory, ICategoryState, IProduct } from '../../types/store';

// INITIAL STATE
const initialState: ICategoryState = {
  categories: [],
  currentCategory: null,
  categoryProducts: [],
};

// SLICE
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCategory: (
      state,
      action: PayloadAction<{
        currentCategory: ICategory;
        categoryProducts: IProduct[];
      }>
    ) => {
      const { currentCategory, categoryProducts } = action.payload;
      state.currentCategory = currentCategory;
      state.categoryProducts = categoryProducts;
    },
  },
});

export const { setCategories, setCategory } = categorySlice.actions;

export default categorySlice.reducer;
