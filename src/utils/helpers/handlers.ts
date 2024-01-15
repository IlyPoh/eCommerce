// IMPORTS
// libraries
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

// helpers
import { errorCodeChecker } from './string';

// store
import { setError } from '@/store/Slices/appSlice';

// types
import { IError } from '@/types';

export const errorHandler = (error: IError, dispatch: Dispatch<AnyAction>) => {
  const { status, message } = error;

  if (status) {
    dispatch(setError(errorCodeChecker(status)));
  } else {
    dispatch(setError(`${message}`));
  }
};
