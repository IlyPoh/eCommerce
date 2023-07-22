// libraries
import { createSlice } from '@reduxjs/toolkit';

// types
import { IReviewsState } from '../../types/store';

const initialState: IReviewsState = {
  reviews: [],
};

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
