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

export const getBlogLink = (category: string | undefined) => {
  if (category) return `/blog/${category}`;
  else return `/blog`;
};

export const getProductsLink = (
  category: string | undefined,
  subcategory: string | undefined
) => {
  switch (true) {
    case !!category && !!subcategory:
      return `/products/${category}/${subcategory}`;
    case !!category:
      return `/products/${category}`;
    default:
      return `/products`;
  }
};

export const convertDataToArrayOfStrings = (data: ISubcategory[]) => {
  return data.map((item) => item.name);
};

export const handleAddFilter = (state: (string | number)[], filter: string) => {
  return state?.find((item) => `${item}` === filter)
    ? state
    : [...state, filter];
};

export const handleRemoveFilter = (
  state: (string | number)[],
  filter: string
) => {
  return state?.filter((item) => `${item}` !== filter);
};

export const errorHandler = (error: IError, dispatch: Dispatch<AnyAction>) => {
  const { status, message } = error;

  if (status) {
    dispatch(setError(errorCodeChecker(status)));
  } else {
    dispatch(setError(`${message}`));
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

  if (name) queryParameters.push(`name=${encodeURIComponent(name)}`);

  if (category_id) queryParameters.push(`category_id=${category_id}`);

  if (subcategory_id) queryParameters.push(`subcategory_id=${subcategory_id}`);

  if (tags) {
    const tagsString = tags.join(',');
    queryParameters.push(`tags=${tagsString}`);
  }

  const queryString =
    queryParameters.length > 0 ? `?${queryParameters.join('&')}` : '';

  return endpoint + queryString;
};

export const buildNewsQueryString = (
  endpoint: string,
  searchOptions: Partial<INewsEndpointOptions>
) => {
  const { year, month, limit, tags, category, page } = searchOptions;
  const queryParameters = [];

  if (limit) queryParameters.push(`limit=${limit}`);

  if (year && month) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);
    const isoStartDate = startDate.toISOString();
    const isoEndDate = endDate.toISOString();

    queryParameters.push(`gte=${isoStartDate}`);
    queryParameters.push(`lte=${isoEndDate}`);
  }

  if (tags) {
    const tagsString = tags.join(',');
    queryParameters.push(`tags=${tagsString}`);
  }

  if (category) queryParameters.push(`category=${category}`);

  if (page) queryParameters.push(`page=${page}`);

  const queryString =
    queryParameters.length > 0 ? `?${queryParameters.join('&')}` : '';

  return endpoint + queryString;
};
