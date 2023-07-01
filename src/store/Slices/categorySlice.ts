// libraries
import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// state
import { setError, setLoading } from './appSlice';

// types
import { ICategoryState, IProduct } from '../../types/store';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const { data } = await axios.get('/db/categories.json');

      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

const initialState: ICategoryState = {
  categories: [],
  category: '',
  categoryProducts: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCategory: (
      state,
      action: PayloadAction<{ category: string; categoryProducts: IProduct[] }>
    ) => {
      const { category, categoryProducts } = action.payload;
      console.log(
        '🚀 ~ file: categorySlice.ts:32 ~ action.payload:',
        action.payload
      );
      console.log(
        '🚀 ~ file: categorySlice.ts:32 ~ categoryProducts:',
        categoryProducts
      );
      console.log('🚀 ~ file: categorySlice.ts:32 ~ category:', category);
      state.category = category;
      state.categoryProducts = categoryProducts;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const { setCategories, setCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
