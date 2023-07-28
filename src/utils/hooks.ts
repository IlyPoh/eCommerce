// libraries
import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// store
import { setNews } from '../store/Slices/newsSlice';
import { setTags } from '../store/Slices/tagsSlice';
import { setLoading } from '../store/Slices/appSlice';
import { useGetNewsQuery } from '../store/API/newsApi';
import { setReviews } from '../store/Slices/reviewSlice';
import { setCategories } from '../store/Slices/categorySlice';
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetReviewsQuery,
  useGetTagsQuery,
} from '../store/API/storeApi';

// types
import { IError, INewsEndpointOptions } from '../types';

// store types
import type { RootState, AppDispatch } from '../store';

// utils
import { errorHandler } from './helpers';
import { IProduct } from '../types/store';

// store hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// fetch hooks
export const useFetchCategories = () => {
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.appState);
  const categoryQuery = useGetCategoriesQuery();

  useEffect(() => {
    if (categoryQuery.error) {
      errorHandler(categoryQuery.error as IError, dispatch);
    } else if (categoryQuery.data) {
      dispatch(setCategories(categoryQuery.data));
    }

    if (categoryQuery.isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [categoryQuery, dispatch]);
  return { error, loading };
};

export const useFetchTags = () => {
  const dispatch = useAppDispatch();
  const tagsQuery = useGetTagsQuery();

  useEffect(() => {
    if (tagsQuery.error) {
      errorHandler(tagsQuery.error as IError, dispatch);
    } else if (tagsQuery.data) {
      dispatch(setTags(tagsQuery.data));
    }

    if (tagsQuery.isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [tagsQuery, dispatch]);
};

export const useFetchReviews = () => {
  const dispatch = useAppDispatch();
  const reviewQuery = useGetReviewsQuery();

  useEffect(() => {
    if (reviewQuery.error) {
      errorHandler(reviewQuery.error as IError, dispatch);
    } else if (reviewQuery.data) {
      dispatch(setReviews(reviewQuery.data));
    }

    if (reviewQuery.isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [reviewQuery, dispatch]);
};

export const useFetchNews = (options: Partial<INewsEndpointOptions> = {}) => {
  const dispatch = useAppDispatch();
  const newsQuery = useGetNewsQuery(options);

  useEffect(() => {
    if (newsQuery.error) {
      errorHandler(newsQuery.error as IError, dispatch);
    } else if (newsQuery.data) {
      dispatch(setNews(newsQuery.data));
    }

    if (newsQuery.isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [newsQuery, dispatch]);
};

export const useFetchProducts = (options: Partial<IProduct> = {}) => {
  const dispatch = useAppDispatch();
  const productQuery = useGetProductsQuery(options);

  useEffect(() => {
    if (productQuery.error) {
      errorHandler(productQuery.error as IError, dispatch);
    }

    if (productQuery.isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [productQuery, dispatch]);
};
