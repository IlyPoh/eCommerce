// IMPORTS
// libraries
import { createSlice } from '@reduxjs/toolkit';

// types
import { IAppState } from '@customTypes/store';

// INITIAL STATE
const initialState: IAppState = {
  loading: false,
  error: null,
  gridView: true,
  total: {
    products: 0,
    news: 0,
    minPriceProduct: 0,
    maxPriceProduct: 0,
  },
};

// SLICE
const appSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setGridView: (state, action) => {
      state.gridView = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
  },
});

export const { setLoading, setError, setGridView, setTotal } = appSlice.actions;

export default appSlice.reducer;
