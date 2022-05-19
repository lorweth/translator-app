import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import ICategory from 'src/shared/models/category';
import { IVideo } from 'src/shared/models/video';
import { serializeAxiosError } from 'src/shared/reducers/reducer.utils';

type StateType = {
  videoList: ReadonlyArray<IVideo>;
  loading: boolean | null;
  errorMessage: string | null;
};

const apiUrl = `${process.env.API_URL}/categories`;

const initialState: StateType = {
  videoList: [],
  loading: null,
  errorMessage: null,
};

// Actions

export const getVideoByCategory = createAsyncThunk(
  'video/fetch_video_by_category',
  async (categoryId: string) => {
    const response = await axios.get<IVideo[]>(`${apiUrl}/${categoryId}/videos`);
    return response;
  },
  {
    serializeError: serializeAxiosError,
  }
);

// Slice

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getVideoByCategory.pending, (state, action) => {
        state.loading = true;
        state.errorMessage = '';
      })
      .addCase(getVideoByCategory.fulfilled, (state, action) => {
        state.videoList = action.payload.data;
        state.loading = false;
      })
      .addCase(getVideoByCategory.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Something went wrong';
        state.loading = false;
      });
  },
});

export default videoSlice.reducer;
