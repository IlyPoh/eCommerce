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
    dispatch(setError(`${error.status}`));
  } else {
    dispatch(setError(`${error.message}`));
  }
};
