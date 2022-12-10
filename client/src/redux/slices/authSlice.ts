import { createSlice } from "@reduxjs/toolkit";

import { fetchTokenThunk } from "redux/services/auth.service";
import { AuthState } from "types";
import jwt_decode from "jwt-decode";
const initialState: AuthState = {
  token: "",
  decodedUser: {
    userId: "",
    email: "",
    role: "",
    iat: 0,
    exp: 0,
    isAdmin: false,
  },
  isLoading: false,
  error: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getToken(state) {
      const token = localStorage.getItem("token");
      if (token) {
        state.decodedUser = jwt_decode(token);
        
      }
    },
  },
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
      state.decodedUser = action.payload.decodedUser;
      state.isLoading = false;
    });
  },
});
export const { getToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
