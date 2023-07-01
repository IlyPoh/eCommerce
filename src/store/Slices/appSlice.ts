// libraries
import { createSlice } from '@reduxjs/toolkit';

// types
import { IAppState } from '../../types/store';

const initialState: IAppState = {
  loading: false,
  error: null,
};

export const appSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setError } = appSlice.actions;

export default appSlice.reducer;
