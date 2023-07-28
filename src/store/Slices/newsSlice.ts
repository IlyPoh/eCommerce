// IMPORTS
import { createSlice } from '@reduxjs/toolkit';

// INITIAL STATE
const initialState = {
  news: [],
  currentNews: null,
};

// SLICE
const newsSlice = createSlice({
  name: 'newsSlice',
  initialState,
  reducers: {
    setNews: (state, action) => {
      state.news = action.payload;
    },
    setCurrentNews: (state, action) => {
      state.currentNews = action.payload;
    },
  },
});

export const { setNews, setCurrentNews } = newsSlice.actions;

export default newsSlice.reducer;
