// IMPORTS
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
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

// HOOKS
// Store hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Fetch hooks
// Custom hook to handle fetching data and dispatching actions
const useFetchData = (
  queryFunction: any,
  successAction: ActionCreatorWithPayload<AppDispatch>,
  options = {}
) => {
  const dispatch = useAppDispatch();
  const query = queryFunction(options);

  useEffect(() => {
    if (query.error) {
      errorHandler(query.error as IError, dispatch);
    } else if (query.data) {
      dispatch(successAction(query.data));
    }

    dispatch(setLoading(query.isLoading));
  }, [query, dispatch, successAction]);
};

// Custom hook for fetching categories
export const useFetchCategories = () => {
  return useFetchData(useGetCategoriesQuery, setCategories);
};

// Custom hook for fetching tags
export const useFetchTags = () => {
  return useFetchData(useGetTagsQuery, setTags);
};

// Custom hook for fetching reviews
export const useFetchReviews = () => {
  return useFetchData(useGetReviewsQuery, setReviews);
};

// Custom hook for fetching news
export const useFetchNews = (options: Partial<INewsEndpointOptions> = {}) => {
  return useFetchData(useGetNewsQuery, setNews, options);
};

// Custom hook for fetching products
export const useFetchProducts = (options: Partial<IProduct> = {}) => {
  return useFetchData(useGetProductsQuery, setLoading, options);
};