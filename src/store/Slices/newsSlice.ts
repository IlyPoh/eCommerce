// IMPORTS
import { createSlice } from '@reduxjs/toolkit';

// INITIAL STATE
const initialState = {
  news: [],
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
    setcurrentArticle: (state, action) => {
      state.currentArticle = action.payload;
    },
  },
});

export const { setNews, setcurrentArticle } = newsSlice.actions;

export default newsSlice.reducer;
