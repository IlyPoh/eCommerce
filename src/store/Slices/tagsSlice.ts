// libraries
import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// types
import { ITagsState } from '../../types/store';

// store
import { setError } from './appSlice';

export const fetchTags = createAsyncThunk(
  'tags/fetchTags',
  async (_, { dispatch }) => {
    try {
      const { data } = await axios.get('/db/tags.json');

      return data;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  }
);

const initialState: ITagsState = {
  tags: [],
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTags: (state, action) => {
      state.tags = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tags = action.payload;
    });
  },
});

export const { setTags } = tagsSlice.actions;

export default tagsSlice.reducer;
