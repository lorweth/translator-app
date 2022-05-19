import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { AppThunk } from 'src/configs/store';
import { StorageAPI } from 'src/shared/util/storage-util';
import { serializeAxiosError } from './reducer.utils';

export const AUTH_TOKEN_KEY = 'authToken';
const API_URL = process.env.API_URL;

export const initialState = {
  loading: false,
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false, // Errors returned from the server
  showModalLogin: false,
  account: {} as any, // User account
  message: null as unknown as string,
  errorMessage: null as unknown as string,
  redirectMessage: null as unknown as string,
  sessionHasBeenFetched: false,
  logoutUrl: null as unknown as string,
};

export type AuthenticationState = Readonly<typeof initialState>;

// Actions

export const getAccount = createAsyncThunk(
  'authentication/get_account',
  async () =>
    axios.get<any>(`${API_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${
          StorageAPI.local.get(AUTH_TOKEN_KEY) || StorageAPI.session.get(AUTH_TOKEN_KEY)
        }`,
      },
    }),
  {
    serializeError: serializeAxiosError,
  }
);

export const updateProfile = createAsyncThunk(
  'authentication/update_profile',
  async (data: any) =>
    axios.put<any>(`${API_URL}/users`, data, {
      headers: {
        Authorization: `Bearer ${
          StorageAPI.local.get(AUTH_TOKEN_KEY) || StorageAPI.session.get(AUTH_TOKEN_KEY)
        }`,
      },
    }),
  {
    serializeError: serializeAxiosError,
  }
);

export const updatePassword = createAsyncThunk(
  'authentication/update_password',
  async (data: any) =>
    axios.put<any>(`${API_URL}/users/password`, data, {
      headers: {
        Authorization: `Bearer ${
          StorageAPI.local.get(AUTH_TOKEN_KEY) || StorageAPI.session.get(AUTH_TOKEN_KEY)
        }`,
      },
    }),
  {
    serializeError: serializeAxiosError,
  }
);

interface IAuthParam {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export const authenticate = createAsyncThunk(
  'authentication/signin',
  async (auth: IAuthParam) => axios.post(`${API_URL}/login`, auth),
  {
    serializeError: serializeAxiosError,
  }
);

export const signin: (username: string, password: string, rememberMe?: boolean) => AppThunk =
  (username, password, rememberMe = false) =>
  async dispatch => {
    const result = await dispatch(authenticate({ username, password, rememberMe }));
    const response = result.payload as AxiosResponse;
    const bearerToken = response.data.token; // Bearer token from the server
    if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
      const jwt = bearerToken.slice(7, bearerToken.length);
      if (rememberMe) {
        StorageAPI.local.set(AUTH_TOKEN_KEY, jwt);
      } else {
        StorageAPI.session.set(AUTH_TOKEN_KEY, jwt);
      }
    } else {
      if (rememberMe) {
        StorageAPI.local.set(AUTH_TOKEN_KEY, bearerToken);
      } else {
        StorageAPI.session.set(AUTH_TOKEN_KEY, bearerToken);
      }
    }
    // Set local lang key
  };

export const clearAuthToken = () => {
  if (StorageAPI.local.get(AUTH_TOKEN_KEY)) {
    StorageAPI.local.remove(AUTH_TOKEN_KEY);
  }
  if (StorageAPI.session.get(AUTH_TOKEN_KEY)) {
    StorageAPI.session.remove(AUTH_TOKEN_KEY);
  }
};

export const logout: () => AppThunk = () => dispatch => {
  clearAuthToken();
  dispatch(logoutSession());
};

export const clearAuthentication = messageKey => dispatch => {
  clearAuthToken();
  dispatch(authError(messageKey));
  dispatch(clearAuth());
};

// Slice

export const AuthenticationSlice = createSlice({
  name: 'authentication',
  initialState: initialState as AuthenticationState,
  reducers: {
    logoutSession() {
      return {
        ...initialState,
        showModalLogin: true,
      };
    },
    authError(state, action) {
      return {
        ...state,
        showModalLogin: true,
        redirectMessage: action.payload,
      };
    },
    clearAuth(state) {
      return {
        ...state,
        loading: false,
        showModalLogin: true,
        isAuthenticated: false,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authenticate.rejected, (state, action) => ({
        ...initialState,
        errorMessage: action.error.message,
        showModalLogin: true,
        loginError: true,
      }))
      .addCase(authenticate.fulfilled, state => ({
        ...state,
        loading: false,
        loginError: false,
        showModalLogin: false,
        loginSuccess: true,
      }))
      .addCase(getAccount.rejected, (state, action) => ({
        ...state,
        loading: false,
        isAuthenticated: false,
        sessionHasBeenFetched: true,
        showModalLogin: true,
        errorMessage: action.error.message,
      }))
      .addCase(getAccount.fulfilled, (state, action) => {
        const isAuthenticated = action.payload && action.payload.data._id;
        return {
          ...state,
          isAuthenticated,
          loading: false,
          sessionHasBeenFetched: true,
          account: action.payload.data,
        };
      })
      .addCase(authenticate.pending, state => {
        state.loading = true;
      })
      .addCase(getAccount.pending, state => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.account = action.payload.data;
        state.loading = false;
        state.errorMessage = null;
      })
      .addCase(updateProfile.pending, state => {
        state.account = {};
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.data.message;
      })
      .addCase(updatePassword.pending, state => {
        state.loading = true;
        state.message = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { logoutSession, authError, clearAuth } = AuthenticationSlice.actions;

// Reducer
export default AuthenticationSlice.reducer;
