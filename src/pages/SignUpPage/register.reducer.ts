import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { serializeAxiosError } from 'src/shared/reducers/reducer.utils';

const API_URL = 'http://localhost:8080';

const initialState = {
  loading: false,
  registrationSuccess: false,
  registrationFailure: false,
  errorMessage: null,
  successMessage: null,
};

export type ResgisterState = Readonly<typeof initialState>;

// Actions
export const handleRegistration = createAsyncThunk(
  'register/handleRegistration',
  async (data: { username: string; password: string; firstname: string; lastname: string }) =>
    axios.post<any>(`${API_URL}/signup`, data),
  { serializeError: serializeAxiosError }
);

// Slice

export const RegisterSlice = createSlice({
  name: 'register',
  initialState: initialState as ResgisterState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(handleRegistration.pending, state => {
        state.loading = true;
      })
      .addCase(handleRegistration.rejected, (state, action) => ({
        ...initialState,
        registrationFailure: true,
        errorMessage: action.error.message,
      }))
      .addCase(handleRegistration.fulfilled, () => ({
        ...initialState,
        registrationSuccess: true,
        successMessage: 'Registration successful!',
      }));
  },
});

export const { reset } = RegisterSlice.actions;

// Reducer
export default RegisterSlice.reducer;
