// libraries
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

// store
import { setError } from '@store/Slices/appSlice';

// types
import { IError, QueryOptions } from '@customTypes/index';
import {
  IProductsEndpointOptions,
  INewsEndpointOptions,
  ISubcategory,
} from '@customTypes/store';

export const firstLettertoUppercase = (string: string): string => {
  return string[0].toUpperCase() + string.slice(1);
};

export const getBlogLink = (category: string | undefined): string => {
  return category ? `/blog/${category}` : `/blog`;
};

export const getProductsLink = (
  category: string | undefined,
  subcategory: string | undefined
): string => {
  if (category && subcategory) {
    return `/products/${category}/${subcategory}`;
  } else if (category) {
    return `/products/${category}`;
  } else {
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
  const errorMessages: { [key: number]: string } = {
    400: 'Bad request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not found',
    500: 'Internal server error',
  };

  const defaultMessage = 'Unknown error';

  return code !== undefined && errorMessages[code] !== undefined
    ? `${code} - ${errorMessages[code]}`
    : defaultMessage;
};

export const formatDate = (inputDate: string): string => {
  const dateObj = new Date(inputDate);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();

  return `${day}.${month}.${year}`;
};

// Query builders
const appendQueryParameter = (
  queryParameters: string[],
  key: string,
  value: string | number | string[] | number[] | null | undefined
): void => {
  if (
    value !== null &&
    value !== undefined &&
    !(Array.isArray(value) && value.length === 0)
  ) {
    queryParameters.push(`${key}=${value}`);
  }
};

const buildQueryString = (
  endpoint: string,
  searchOptions: Partial<QueryOptions>
): string => {
  const queryParameters: string[] = [];

  for (const key in searchOptions) {
    const value = searchOptions[key];
    appendQueryParameter(queryParameters, key, value);
  }

  const queryString =
    queryParameters.length > 0 ? `?${queryParameters.join('&')}` : '';
  return endpoint + queryString;
};

export const buildProductQueryString = (
  endpoint: string,
  searchOptions: Partial<IProductsEndpointOptions>
): string => {
  return buildQueryString(endpoint, searchOptions);
};

export const buildNewsQueryString = (
  endpoint: string,
  searchOptions: Partial<INewsEndpointOptions>
): string => {
  return buildQueryString(endpoint, searchOptions);
};
