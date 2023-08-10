// libraries
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

// store
import { setError } from '../store/Slices/appSlice';

// types
import { IError } from '../types';
import {
  IProductsEndpointOptions,
  INewsEndpointOptions,
  ISubcategory,
} from '../types/store';

export const firstLettertoUppercase = (string: string): string => {
  return string[0].toUpperCase() + string.slice(1);
};

export const getPaginationIndexes = (page: number, productsPerPage = 10) => {
  const start = page * productsPerPage - productsPerPage;
  const end = page * productsPerPage;

  return { start, end };
};

export const getBlogLink = (
  category: string | undefined,
  month: string | undefined,
  year: string | undefined
) => {
  if (category) return `/blog/category/${category}`;
  else if (month && year) return `/blog/${year}/${month}`;
  else return `/blog`;
};

export const convertDataToArrayOfStrings = (data: ISubcategory[]) => {
  return data.map((item) => item.name);
};

export const errorHandler = (error: IError, dispatch: Dispatch<AnyAction>) => {
  if ('status' in error) {
    dispatch(setError(errorCodeChecker(error.status)));
  } else {
    dispatch(setError(`${error.message}`));
  }
};

const errorCodeChecker = (code: number | undefined): string => {
  switch (code) {
    case 400:
      return `${code} - Bad request`;
    case 401:
      return `${code} - Unauthorized`;
    case 403:
      return `${code} - Forbidden`;
    case 404:
      return `${code} - Not found`;
    case 500:
      return `${code} - Internal server error`;
    default:
      return `${code} - Unknown error`;
  }
};

export const formatDate = (inputDate: string): string => {
  const dateObj = new Date(inputDate);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();

  return `${day}.${month}.${year}`;
};

export const buildProductQueryString = (
  endpoint: string,
  searchOptions: Partial<IProductsEndpointOptions>
): string => {
  const { id, name, category_id, subcategory_id, tags } = searchOptions;
  const queryParameters = [];

  if (id) queryParameters.push(`id=${id}`);
  else if (name) queryParameters.push(`name=${encodeURIComponent(name)}`);
  else if (category_id) queryParameters.push(`category_id=${category_id}`);
  else if (subcategory_id)
    queryParameters.push(`subcategory_id=${subcategory_id}`);
  else if (tags) {
    const tagsQuery = tags
      .map((tag) => `tags_like=${encodeURIComponent(tag)}`)
      .join('&');
    queryParameters.push(`?${tagsQuery}`);
  }

  const queryString =
    queryParameters.length > 0 ? `?${queryParameters.join('&')}` : '';

  return endpoint + queryString;
};

export const buildNewsQueryString = (
  endpoint: string,
  searchOptions: Partial<INewsEndpointOptions>
) => {
  const { year, month, limit, page, tag, category } = searchOptions;
  const queryParameters = [];

  if (limit) queryParameters.push(`_limit=${limit}`);
  else if (page) queryParameters.push(`_page=${page}`);

  if (year && month) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);
    const isoStartDate = startDate.toISOString();
    const isoEndDate = endDate.toISOString();

    queryParameters.push(`publishedAt_gte=${isoStartDate}`);
    queryParameters.push(`publishedAt_lte=${isoEndDate}`);
  }

  if (tag) queryParameters.push(`tags_like=${tag}`);

  if (category) queryParameters.push(`category=${category}`);

  const queryString =
    queryParameters.length > 0 ? `?${queryParameters.join('&')}` : '';

  return endpoint + queryString;
};
