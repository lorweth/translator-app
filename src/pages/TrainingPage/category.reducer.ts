import { createAsyncThunk, createSlice, isFulfilled } from '@reduxjs/toolkit';
import axios from 'axios';
import { serializeAxiosError } from 'src/shared/reducers/reducer.utils';
import ICategory, { defaultValue } from '../../shared/models/category';

type StateType = {
  categories: ReadonlyArray<ICategory>;
  category: ICategory;
  loading: boolean;
  errorMessage: string;
  totalItems: number;
};

const initialState: StateType = {
  categories: [],
  category: defaultValue,
  loading: false,
  errorMessage: null,
  totalItems: 0,
};

const apiUrl = `${process.env.API_URL}/categories`;

// Actions

export const getAllCategories = createAsyncThunk(
  'category/fetch_all_categories',
  async () => {
    const res = await axios.get<ICategory[]>(apiUrl);
    return res;
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const findCategoryByName = createAsyncThunk(
  'category/fetch_category_by_name',
  async (name: string) => {
    const res = await axios.get<ICategory[]>(`${apiUrl}?name=${name}`);
    return res;
  },
  {
    serializeError: serializeAxiosError,
  }
);

// Slice

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload.data;
        state.loading = false;
        state.errorMessage = null;
        state.totalItems = action.payload.data.length;
      })
      .addCase(getAllCategories.pending, state => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(findCategoryByName.fulfilled, (state, action) => {
        state.categories = action.payload.data;
        state.loading = false;
      })
      .addCase(findCategoryByName.pending, state => {
        state.loading = true;
        state.errorMessage = null;
      });
  },
});

export const { reset } = categorySlice.actions;

export default categorySlice.reducer;
