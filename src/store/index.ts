// IMPORTS
// libraries
import { configureStore } from '@reduxjs/toolkit';

// apis
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
    [storeApi.reducerPath]: storeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([storeApi.middleware]);
  },
});

// TYPES FOR STORE
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
