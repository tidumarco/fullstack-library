import { CredentialResponse } from "@react-oauth/google";
import { createSlice } from "@reduxjs/toolkit";

import { fetchTokenThunk } from "redux/services/auth.service";
import { AuthState } from "types";

const initialState: AuthState = {
  token: "",
  isLoading: false,
  error: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTokenThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTokenThunk.rejected, (state, action) => {
      state.error = true;
      state.isLoading = false;
    });
    builder.addCase(fetchTokenThunk.fulfilled, (state, action) => {
      state.token = action.payload?.data;
      state.isLoading = false;
    });
  },
});

export const authReducer = authSlice.reducer;
