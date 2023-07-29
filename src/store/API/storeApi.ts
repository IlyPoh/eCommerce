// IMPORTS
// libraries
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// types
import {
  IArticle,
  ICategory,
  INewsEndpointOptions,
  IProduct,
  IProductsEndpointOptions,
  IReview,
  ITag,
} from '../../types/store';

// utils
import {
  buildNewsQueryString,
  buildProductQueryString,
} from '../../utils/helpers';
import { STORE_API_URL, STORE_API_ENDPOINTS } from '../../utils/constants';

// API
export const storeApi = createApi({
  reducerPath: 'storeApi',
  tagTypes: ['Products', 'Categories', 'Tags', 'Reviews'],
  baseQuery: fetchBaseQuery({ baseUrl: STORE_API_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], Partial<IProductsEndpointOptions>>({
      query: (searchOptions) =>
        buildProductQueryString(STORE_API_ENDPOINTS.products, searchOptions),
      providesTags: ['Products'],
    }),
    getCategories: builder.query<ICategory[], void>({
      query: () => STORE_API_ENDPOINTS.categories,
      providesTags: ['Categories'],
    }),
    getTags: builder.query<ITag[], void>({
      query: () => STORE_API_ENDPOINTS.tags,
      providesTags: ['Tags'],
    }),
    getReviews: builder.query<IReview[], void>({
      query: () => STORE_API_ENDPOINTS.reviews,
      providesTags: ['Reviews'],
    }),
    getNews: builder.query<IArticle[], Partial<INewsEndpointOptions>>({
      query: (searchOptions) =>
        buildNewsQueryString(STORE_API_ENDPOINTS.news, searchOptions),
      providesTags: ['Reviews'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetTagsQuery,
  useGetReviewsQuery,
  useGetNewsQuery,
} = storeApi;
