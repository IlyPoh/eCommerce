import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICategory, ICategoryState, IProduct } from '../../types/store';

const initialState: ICategoryState = {
  categories: [],
  currentCategory: null,
  categoryProducts: [],
};

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
      console.log(
        '🚀 ~ file: categorySlice.ts:32 ~ action.payload:',
        action.payload
      );
      console.log(
        '🚀 ~ file: categorySlice.ts:32 ~ categoryProducts:',
        categoryProducts
      );
      console.log(
        '🚀 ~ file: categorySlice.ts:32 ~ category:',
        currentCategory
      );
      state.currentCategory = currentCategory;
      state.categoryProducts = categoryProducts;
    },
  },
});

export const { setCategories, setCategory } = categorySlice.actions;

export default categorySlice.reducer;
