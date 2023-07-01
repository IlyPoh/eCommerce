// libraries
import { configureStore } from '@reduxjs/toolkit';

// slices
import appStateSlice from './Slices/appSlice';
import categoriesSlice from './Slices/categorySlice';
import tagsSlice from './Slices/tagsSlice';

export const store = configureStore({
  reducer: {
    appState: appStateSlice,
    categories: categoriesSlice,
    tags: tagsSlice,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
