// libraries
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

// store
import { setError } from '../store/Slices/appSlice';

// types
import { IError } from '../types';

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
