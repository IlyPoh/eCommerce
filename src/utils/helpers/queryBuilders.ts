// IMPORTS
// types
import { QueryOptions } from '@/types';
import { INewsEndpointOptions, IProductsEndpointOptions } from '@/types/store';

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
