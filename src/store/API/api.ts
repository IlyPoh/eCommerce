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
    getProducts: builder.query<IProduct[], Partial<IProduct>>({
      query: (searchOptions) => {
        const { id, name, category_id, subcategory_id, tags } = searchOptions;

        let queryString = 'products';

        if (id) queryString += `?id=${id}`;
        else if (name) queryString += `?name=${encodeURIComponent(name)}`;
        else if (category_id) queryString += `?category_id=${category_id}`;
        else if (subcategory_id)
          queryString += `?subcategory_id=${subcategory_id}`;
        else if (tags) {
          const tagsQuery = tags
            .map((tag) => `tags[]=${encodeURIComponent(tag)}`)
            .join('&');
          queryString += `?${tagsQuery}`;
        }

        return queryString;
      },
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
