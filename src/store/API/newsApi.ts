// libraries
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// types
import { IArticles } from '../../types/store';

// utils
import { INewsEndpointOptions } from '../../types';
import { buildNewsQueryString } from '../../utils/helpers';
import { NEWS_API_KEY, NEWS_API_URL } from '../../utils/constants';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  tagTypes: ['News'],
  baseQuery: fetchBaseQuery({ baseUrl: NEWS_API_URL }),
  endpoints: (builder) => ({
    getNews: builder.query<IArticles, Partial<INewsEndpointOptions>>({
      query: (searchOptions) =>
        buildNewsQueryString(searchOptions, NEWS_API_KEY),
      providesTags: ['News'],
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
