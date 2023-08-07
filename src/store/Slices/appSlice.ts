// IMPORTS
// libraries
import { createSlice } from '@reduxjs/toolkit';

// types
import { IAppState } from '../../types/store';

// INITIAL STATE
const initialState: IAppState = {
  loading: false,
  error: null,
  gridView: true,
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
  },
});

export const { setLoading, setError, setGridView } = appSlice.actions;

export default appSlice.reducer;
