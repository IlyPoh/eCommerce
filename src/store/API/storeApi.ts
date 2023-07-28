// IMPORTS
// libraries
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// types
import { ICategory, IProduct, IReview, ITag } from '../../types/store';

// utils
import { buildProductQueryString } from '../../utils/helpers';
import { STORE_API_URL, STORE_API_ENDPOINTS } from '../../utils/constants';

// API
export const storeApi = createApi({
  reducerPath: 'storeApi',
  tagTypes: ['Products', 'Categories', 'Tags', 'Reviews'],
  baseQuery: fetchBaseQuery({ baseUrl: STORE_API_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], Partial<IProduct>>({
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
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetTagsQuery,
  useGetReviewsQuery,
} = storeApi;
