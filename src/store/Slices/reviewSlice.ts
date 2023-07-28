// IMPORTS
// libraries
import { createSlice } from '@reduxjs/toolkit';

// types
import { IReviewsState } from '../../types/store';

// INITIAL STATE
const initialState: IReviewsState = {
  reviews: [],
};

// SLICE
const reviewSlice = createSlice({
  name: 'reviewSlice',
  initialState,
  reducers: {
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
  },
});

export const { setReviews } = reviewSlice.actions;

export default reviewSlice.reducer;
