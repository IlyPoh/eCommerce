// libraries
import { configureStore } from '@reduxjs/toolkit';

// apis
import { api } from './API/api';

// slices
import tagsSlice from './Slices/tagsSlice';
import appStateSlice from './Slices/appSlice';
import categorySlice from './Slices/categorySlice';
import productsSlice from './Slices/productsSlice';
import reviewSlice from './Slices/reviewSlice';

export const store = configureStore({
  reducer: {
    appState: appStateSlice,
    tagsState: tagsSlice,
    categoryState: categorySlice,
    productState: productsSlice,
    reviewsState: reviewSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([api.middleware]);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
