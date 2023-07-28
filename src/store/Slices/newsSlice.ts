import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  news: [],
  currentNews: null,
};

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
