// libraries
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

// store
import { setError } from '../store/Slices/appSlice';

// types
import { IError } from '../types';
import { IProductsEndpointOptions, INewsEndpointOptions } from '../types/store';

export const firstLettertoUppercase = (string: string): string => {
  return string[0].toUpperCase() + string.slice(1);
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
  let queryString = endpoint;

  if (id) queryString += `?id=${id}`;
  else if (name) queryString += `?name=${encodeURIComponent(name)}`;
  else if (category_id) queryString += `?category_id=${category_id}`;
  else if (subcategory_id) queryString += `?subcategory_id=${subcategory_id}`;
  else if (tags) {
    const tagsQuery = tags
      .map((tag) => `tags[]=${encodeURIComponent(tag)}`)
      .join('&');
    queryString += `?${tagsQuery}`;
  }

  return queryString;
};

export const buildNewsQueryString = (
  endpoint: string,
  searchOptions: INewsEndpointOptions
) => {
  const { id, page, limit = 9 } = searchOptions;
  let queryString = endpoint;

  if (id) queryString += `?id=${id}`;
  else if (limit) queryString += `?_limit=${limit}`;
  else if (page) queryString += `?_page=${page}`;

  return queryString;
};
