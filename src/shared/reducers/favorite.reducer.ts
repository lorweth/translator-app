import IVocabulary from 'src/shared/models/vocabulary';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { serializeAxiosError } from 'src/shared/reducers/reducer.utils';
import { StorageAPI } from 'src/shared/util/storage-util';
import { AUTH_TOKEN_KEY } from 'src/shared/reducers/authentication';

const apiUrl = process.env.API_URL + '/users' + '/favorite-vocabularies';
const configs = () => ({
  headers: {
    Authorization: `Bearer ${
      StorageAPI.local.get(AUTH_TOKEN_KEY) || StorageAPI.session.get(AUTH_TOKEN_KEY)
    }`,
  },
});

interface FavoriteState {
  favoriteList: ReadonlyArray<IVocabulary>;
  loading: boolean;
  updateSuccess: boolean | null;
  errorMessage: string | null;
}

const initialState: FavoriteState = {
  favoriteList: [],
  loading: false,
  updateSuccess: null,
  errorMessage: '',
};

// Actions

type ResponseType = {
  vocabularies: IVocabulary[];
  _id: string;
  username?: string;
  firstName?: string;
  lastName?: string;
};

export const getAllFavorites = createAsyncThunk(
  'favorite/fetch_all_favorite_words',
  async () => {
    const response = await axios.get<ResponseType>(apiUrl, configs());
    return response.data;
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const updateFavoriteWord = createAsyncThunk(
  'favorite/update_favorite_word',
  async (vocabularyId: string) => {
    const res = await axios.put<any>(apiUrl, { vocabularyId }, configs());
    return res.data;
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const deleteFavoriteWord = createAsyncThunk(
  'favorite/delete_favorite_word',
  async (vocabularyId: string) => {
    const res = await axios.delete(apiUrl + `/${vocabularyId}`, configs());
    return res.data;
  },
  {
    serializeError: serializeAxiosError,
  }
);

// Slice
const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllFavorites.fulfilled, (state, action) => {
        if (
          action.payload.vocabularies &&
          action.payload.vocabularies.length > 0 &&
          action.payload.vocabularies[0] !== null
        ) {
          return {
            ...state,
            favoriteList: action.payload.vocabularies,
            loading: false,
          };
        }
        return {
          ...state,
          favoriteList: [],
          loading: false,
        };
      })
      .addCase(getAllFavorites.pending, state => {
        state.loading = true;
        state.errorMessage = '';
      })
      .addCase(getAllFavorites.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = 'Internal server error';
      })
      .addCase(updateFavoriteWord.fulfilled, (state, action) => {
        state.loading = false;
        state.updateSuccess = true;
      })
      .addCase(updateFavoriteWord.pending, state => {
        state.loading = false;
        state.updateSuccess = null;
      })
      .addCase(updateFavoriteWord.rejected, (state, action) => {
        state.loading = false;
        state.updateSuccess = false;
        state.errorMessage = 'Error updating favorite word';
      })
      .addCase(deleteFavoriteWord.fulfilled, (state, action) => {
        state.loading = false;
        state.updateSuccess = true;
      })
      .addCase(deleteFavoriteWord.pending, state => {
        state.loading = true;
        state.updateSuccess = null;
      })
      .addCase(deleteFavoriteWord.rejected, state => {
        state.loading = false;
        state.updateSuccess = false;
        state.errorMessage = 'Cannot delete favorite word';
      });
  },
});

export const { reset } = favoriteSlice.actions;

export default favoriteSlice.reducer;
