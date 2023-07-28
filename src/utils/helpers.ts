// libraries
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

// store
import { setError } from '../store/Slices/appSlice';

// types
import { IError, INewsEndpointOptions } from '../types';
import { IProduct } from '../types/store';

// utils

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

export const buildProductQueryString = (
  endpoint: string,
  searchOptions: Partial<IProduct>
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
  searchOptions: Partial<INewsEndpointOptions>,
  apiKey: string
): string => {
  const {
    q = 'technology',
    pageSize = 9,
    page = 1,
    ...otherOptions
  } = searchOptions;

  let queryString = `?apiKey=${apiKey}&q=${encodeURIComponent(
    q
  )}&pageSize=${pageSize}&page=${page}`;

  if (Object.keys(otherOptions).length) {
    queryString += `&${Object.keys(otherOptions)
      .map((key) => `${key}=${encodeURIComponent((otherOptions as any)[key])}`)
      .join('&')}`;
  }

  return queryString;
};
