// IMPORTS
// libraries
import { useEffect } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// store
import { setNews, setNewsCategories } from '../store/Slices/newsSlice';
import { setTags } from '../store/Slices/tagsSlice';
import { setLoading } from '../store/Slices/appSlice';
import { setReviews } from '../store/Slices/reviewSlice';
import {
  setProducts,
  setProductCategories,
  setBrands,
} from '../store/Slices/productsSlice';
import {
  useGetProductCategoriesQuery,
  useGetNewsCategoriesQuery,
  useGetNewsQuery,
  useGetProductsQuery,
  useGetReviewsQuery,
  useGetTagsQuery,
  useGetBrandsQuery,
} from '../store/API/storeApi';

// types
import { IError } from '../types';

// store types
import type { RootState, AppDispatch } from '../store';
import {
  INewsEndpointOptions,
  IPageState,
  IProductsEndpointOptions,
} from '../types/store';

// utils
import { errorHandler } from './helpers';
import {
  setCurrentPage,
  setItemCount,
  setItemsPerPage,
  setItemsToShow,
  setPageCount,
  setPageTitle,
  setPageType,
  setPageURL,
} from '../store/Slices/pageSlice';

// HOOKS
// Store hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Fetch hooks
// Custom hook to handle fetching data and dispatching actions
const useFetchData = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  return useFetchData(useGetProductCategoriesQuery, setProductCategories);
};

// Custom hook for fetching tags
export const useFetchTags = () => {
  return useFetchData(useGetTagsQuery, setTags);
};

// Custom hook for fetching products
export const useFetchProducts = (
  options: Partial<IProductsEndpointOptions> = {}
) => {
  return useFetchData(useGetProductsQuery, setProducts, options);
};

// Custom hook for fetching reviews
export const useFetchReviews = () => {
  return useFetchData(useGetReviewsQuery, setReviews);
};

// Custom hook for fetching news
export const useFetchNews = (options: Partial<INewsEndpointOptions> = {}) => {
  return useFetchData(useGetNewsQuery, setNews, options);
};

// Custom hook for fetching news categories
export const useFetchNewsCategories = () => {
  return useFetchData(useGetNewsCategoriesQuery, setNewsCategories);
};

// Custom hook for fetching brands
export const useFetchBrands = () => {
  return useFetchData(useGetBrandsQuery, setBrands);
};

// Custom hook for page state
export const usePageState = (state: Partial<IPageState>) => {
  const dispatch = useAppDispatch();
  const {
    currentPage,
    pageURL,
    pageTitle,
    pageType,
    itemsPerPage,
    itemsToShow,
    itemCount,
    pageCount,
  } = state;

  useEffect(() => {
    dispatch(setCurrentPage(currentPage));
    dispatch(setPageURL(pageURL));
    dispatch(setPageTitle(pageTitle));
    dispatch(setPageType(pageType));
    dispatch(setItemsPerPage(itemsPerPage));
    dispatch(setItemsToShow(itemsToShow));
    dispatch(setItemCount(itemCount));
    dispatch(setPageCount(pageCount));
  }, [
    dispatch,
    currentPage,
    pageURL,
    pageTitle,
    pageType,
    itemsPerPage,
    itemsToShow,
    itemCount,
    pageCount,
  ]);
};
