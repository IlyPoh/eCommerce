// IMPORTS
// libraries
import { createSlice } from '@reduxjs/toolkit';
// types
import { IPageState } from '../../types/store';

// INITIAL STATE
const initialState: IPageState = {
  currentPage: 1,
  pageType: null,
  pageURL: '',
  pageTitle: '',
  itemsPerPage: 10,
  itemCount: 0,
  pageCount: 0,
};

// SLICE
const pageSlice = createSlice({
  name: 'pageSlice',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageType: (state, action) => {
      state.pageType = action.payload;
    },
    setPageURL: (state, action) => {
      state.pageURL = action.payload;
    },
    setPageTitle: (state, action) => {
      state.pageTitle = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setItemCount: (state, action) => {
      state.itemCount = action.payload;
    },
    setPageCount: (state, action) => {
      state.pageCount = action.payload;
    },
  },
});

// EXPORT ACTIONS
export const {
  setCurrentPage,
  setPageURL,
  setPageTitle,
  setPageType,
  setItemsPerPage,
  setItemCount,
  setPageCount,
} = pageSlice.actions;

// EXPORT REDUCER
export default pageSlice.reducer;
