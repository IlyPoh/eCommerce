// IMPORTS
import { createSlice } from '@reduxjs/toolkit';

// INITIAL STATE
const initialState = {
  news: {
    newsData: [],
    totalPages: 0,
  },
  categories: [],
  currentArticle: null,
};

// SLICE
const newsSlice = createSlice({
  name: 'newsSlice',
  initialState,
  reducers: {
    setNews: (state, action) => {
      state.news = action.payload;
    },
    setNewsCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCurrentArticle: (state, action) => {
      state.currentArticle = action.payload;
    },
  },
});

export const { setNews, setNewsCategories, setCurrentArticle } =
  newsSlice.actions;

export default newsSlice.reducer;
