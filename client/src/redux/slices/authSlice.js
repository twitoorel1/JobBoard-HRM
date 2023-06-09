import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setLocalStorageValue } from "src/utils/localStorage.util";
import { isLogin, login, register } from "src/services/auth.service";

export const loginByEmailAndPassword = createAsyncThunk(
  "auth/loginByEmailAndPassword",
  async (values) => {
    const response = await login(values.email, values.password);
    return response.data;
  }
);

export const registerByPayload = createAsyncThunk(
  "auth/registerByPayload",
  async (values) => {
    // console.log(values)
    console.log(values.firstName);
    const response = await register(
      values.email,
      values.password,
      values.firstName,
      values.lastName
    );
    return response;
  }
);

export const isLoginByToken = createAsyncThunk(
  "auth/IsLoginByToken",
  async () => {
    const response = await isLogin();
    return response.data;
  }
);

const initialState = {
  isLoading: false,
  isAuth: false,
  error: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth: (state) => {
      state.isAuth = !state.isAuth;
    },
    clearErrorMessage: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login By Email And Password
    builder
      .addCase(loginByEmailAndPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.user = null;
        state.isAuth = false;
      })
      .addCase(loginByEmailAndPassword.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isAuth = true;
        state.error = null;
        state.user = payload;
        setLocalStorageValue("token", payload.jwt_ac_token);
      })
      .addCase(loginByEmailAndPassword.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = null;
        state.error = `Email or Password Invalid.`;
      });

    // Register By Payload
    builder
      .addCase(registerByPayload.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.user = null;
        state.isAuth = false;
      })
      .addCase(registerByPayload.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isAuth = true;
        state.error = null;
        state.user = payload;
        setLocalStorageValue("token", payload.jwt_ac_token);
      })
      .addCase(registerByPayload.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = null;
        state.error = `Missing Information.`;
      });

    // Is Login By Token
    builder
      .addCase(isLoginByToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.user = null;
        state.isAuth = false;
      })
      .addCase(isLoginByToken.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isAuth = true;
        state.error = null;
        state.user = payload;
      })
      .addCase(isLoginByToken.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = null;
        state.error = `Invalid token.`;
      });
  },
});

export const { setIsAuth, clearErrorMessage } = authSlice.actions;
export default authSlice.reducer;
