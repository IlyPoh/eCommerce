// libraries
import { createSlice } from '@reduxjs/toolkit';

// types
import { ITagsState } from '../../types/store';

const initialState: ITagsState = {
  tags: [],
};

export const tagsSlice = createSlice({
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
