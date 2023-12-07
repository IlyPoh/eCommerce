// IMPORTS
// libraries
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// types
import {
  IArticle,
  ICategory,
  INewsEndpointOptions,
  IProductsData,
  IProductsEndpointOptions,
  IReview,
  ITag,
} from '../../types/store';

// utils
import {
  buildNewsQueryString,
  buildProductQueryString,
} from '../../utils/helpers';
import {
  STORE_API_URL,
  STORE_API_ENDPOINTS as ENDPOINTS,
} from '../../utils/constants';
import { ILink } from '../../types';

// API
export const storeApi = createApi({
  reducerPath: 'storeApi',
  tagTypes: [
    'Products',
    'Categories',
    'Tags',
    'Reviews',
    'News',
    'Article',
    'News Categories',
    'Brands',
    'Total',
  ],
  baseQuery: fetchBaseQuery({ baseUrl: STORE_API_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      IProductsData,
      Partial<IProductsEndpointOptions>
    >({
      query: (searchOptions) =>
        buildProductQueryString(ENDPOINTS.products, searchOptions),
      providesTags: ['Products'],
    }),
    getProductCategories: builder.query<ICategory[], void>({
      query: () => ENDPOINTS.categories,
      providesTags: ['Categories'],
    }),
    getTags: builder.query<ITag[], void>({
      query: () => ENDPOINTS.productTags,
      providesTags: ['Tags'],
    }),
    getReviews: builder.query<IReview[], void>({
      query: () => ENDPOINTS.reviews,
      providesTags: ['Reviews'],
    }),
    getNews: builder.query<IArticle[], Partial<INewsEndpointOptions>>({
      query: (searchOptions) =>
        buildNewsQueryString(ENDPOINTS.news, searchOptions),
      providesTags: ['News'],
    }),
    getNewsCategories: builder.query<ILink[], void>({
      query: () => ENDPOINTS.newsCategories,
      providesTags: ['News Categories'],
    }),
    getArticle: builder.query<IArticle, string | number>({
      query: (id) => `${ENDPOINTS.news}/${id}`,
      providesTags: ['Article'],
    }),
    getBrands: builder.query<string[], void>({
      query: () => ENDPOINTS.brands,
      providesTags: ['Brands'],
    }),
    getTotal: builder.query<number, void>({
      query: () => ENDPOINTS.total,
      providesTags: ['Total'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductCategoriesQuery,
  useGetTagsQuery,
  useGetReviewsQuery,
  useGetNewsQuery,
  useGetNewsCategoriesQuery,
  useGetArticleQuery,
  useGetBrandsQuery,
  useGetTotalQuery,
} = storeApi;
