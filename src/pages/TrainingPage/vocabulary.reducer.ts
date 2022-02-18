import { createAsyncThunk, createSlice, isFulfilled } from '@reduxjs/toolkit';
import axios from 'axios';
import ICategory from 'src/shared/models/category';
import IVocabulary, { defaultValue } from 'src/shared/models/vocabulary';
import { serializeAxiosError } from 'src/shared/reducers/reducer.utils';

type StateType = {
  vocabularies: ReadonlyArray<IVocabulary>;
  vocabulary: IVocabulary;
  loading: boolean;
  errorMessage: string;
  totalItems: number;
};

const initialState: StateType = {
  vocabularies: [],
  vocabulary: defaultValue,
  loading: false,
  errorMessage: null,
  totalItems: 0,
};

const apiUrl = `${process.env.API_URL}/categories`;

// Actions

export const getAllVocabulariesOfTheCategory = createAsyncThunk(
  'vocabulary/fetch_all_vocabularies_of_the_category',
  async (categoryId: string) => {
    const res = await axios.get<IVocabulary[]>(`${apiUrl}/${categoryId}/vocabularies`);
    return res;
  },
  {
    serializeError: serializeAxiosError,
  }
);

// Slice

const vocabularySlice = createSlice({
  name: 'vocabulary',
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllVocabulariesOfTheCategory.fulfilled, (state, action) => {
        state.vocabularies = action.payload.data;
        state.loading = false;
        state.errorMessage = null;
        state.totalItems = action.payload.data.length;
      })
      .addCase(getAllVocabulariesOfTheCategory.pending, state => {
        state.loading = true;
        state.errorMessage = null;
      });
  },
});

export const { reset } = vocabularySlice.actions;

export default vocabularySlice.reducer;
