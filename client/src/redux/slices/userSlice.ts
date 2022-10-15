import { createSlice } from "@reduxjs/toolkit";
import {
  createUserThunk,
  deleteUserThunk,
  fetchUsersThunk,
  fetchUserThunk,
  updateUserThunk,
} from "redux/services/user.service";
import { User } from "types";

export interface UsersState {
  allUsers: User[];
  isLoading: boolean;
}

export const initialState: UsersState = {
  allUsers: [],
  isLoading: false,
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //GET ALL USERS
    builder.addCase(fetchUsersThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsersThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchUsersThunk.fulfilled, (state, action) => {
      state.allUsers = action.payload.data;
      state.isLoading = false;
    });

    //GET ONE USER
    builder.addCase(fetchUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserThunk.fulfilled, (state, action) => {
      state.allUsers = action.payload.data;
      state.isLoading = false;
    });

    //CREATE ONE USER
    builder.addCase(createUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createUserThunk.fulfilled, (state, action) => {
      state.allUsers = [...state.allUsers, action.payload.data];
      state.isLoading = false;
    });

    //UPDATE ONE USER
    builder.addCase(updateUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserThunk.fulfilled, (state, action) => {
      state.allUsers = action.payload.data;
      state.isLoading = false;
    });

    //DELETE ONE USER
    builder.addCase(deleteUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUserThunk.fulfilled, (state, action) => {
      state.allUsers = state.allUsers.filter(
        (user) => user._id !== action.payload.data
      );
      state.isLoading = false;
    });
  },
});

export const usersReducer = usersSlice.reducer;
