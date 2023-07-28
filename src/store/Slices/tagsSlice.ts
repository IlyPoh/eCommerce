// IMPORTS
// libraries
import { createSlice } from '@reduxjs/toolkit';

// types
import { ITagsState } from '../../types/store';

// INITIAL STATE
const initialState: ITagsState = {
  tags: [],
};

// SLICE
const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTags: (state, action) => {
      state.tags = action.payload;
    },
  },
});

export const { setTags } = tagsSlice.actions;

export default tagsSlice.reducer;
