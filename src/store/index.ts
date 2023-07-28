// IMPORTS
// libraries
import { configureStore } from '@reduxjs/toolkit';

// apis
import { newsApi } from './API/newsApi';
import { storeApi } from './API/storeApi';

// slices
import tagsSlice from './Slices/tagsSlice';
import newsSlice from './Slices/newsSlice';
import appStateSlice from './Slices/appSlice';
import reviewSlice from './Slices/reviewSlice';
import categorySlice from './Slices/categorySlice';
import productsSlice from './Slices/productsSlice';

// STORE
export const store = configureStore({
  reducer: {
    appState: appStateSlice,
    productState: productsSlice,
    categoryState: categorySlice,
    newsState: newsSlice,
    tagsState: tagsSlice,
    reviewsState: reviewSlice,
    [newsApi.reducerPath]: newsApi.reducer,
    [storeApi.reducerPath]: storeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      storeApi.middleware,
      newsApi.middleware,
    ]);
  },
});

// TYPES FOR STORE
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
