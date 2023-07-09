// libraries
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// types
import { ICategory, IProduct, IReview, ITag } from '../../types/store';

const API_URL = 'http://localhost:3001/';

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Products', 'Categories', 'Tags', 'Reviews'],
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => `products`,
      providesTags: ['Products'],
    }),
    getCategories: builder.query<ICategory[], void>({
      query: () => `categories`,
      providesTags: ['Categories'],
    }),
    getTags: builder.query<ITag[], void>({
      query: () => `tags`,
      providesTags: ['Tags'],
    }),
    getReviews: builder.query<IReview[], void>({
      query: () => `reviews`,
      providesTags: ['Reviews'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetTagsQuery,
  useGetReviewsQuery,
} = api;
