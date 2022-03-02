import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { objectTraps } from 'immer/dist/internal';
import qs from 'qs'; // query string
import { serializeAxiosError } from 'src/shared/reducers/reducer.utils';

type StateType = {
  translated: string;
  loading: boolean;
  errorMessage: string | null;
};

const initialState: StateType = {
  translated: '',
  loading: false,
  errorMessage: null,
};

const apiUrl = process.env.TRANSLATE_API_URL;

const configs = {
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'x-rapidapi-host': process.env.X_RAPIDAPI_HOST,
    'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
  },
};

const stringifyQueryParams = (text: string, to: string, from: string) =>
  qs.stringify({ text, to, from });

// Actions

export type TranslateRequestType = {
  text: string;
  to: string;
  from: string;
};

export const translateS2T = createAsyncThunk(
  'translate/translate_source_to_target',
  async ({ text, to, from }: TranslateRequestType) => {
    const res = await axios.post<any>(apiUrl, stringifyQueryParams(text, to, from), configs);
    return res.data;
  },
  {
    serializeError: serializeAxiosError,
  }
);

// Slice
const translateSlice = createSlice({
  name: 'translate',
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(translateS2T.fulfilled, (state, action) => {
        const { translated_text } = action.payload;
        const text = translated_text[Object.keys(translated_text)[0]];

        state.translated = text;
        state.loading = false;
        state.errorMessage = null;
      })
      .addCase(translateS2T.pending, state => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(translateS2T.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Translate failed with unknown error';
      });
  },
});

export const { reset } = translateSlice.actions;

export default translateSlice.reducer;
