import { createSlice } from "@reduxjs/toolkit";
import {
  createAuthorThunk,
  deleteAuthorThunk,
  fetchAuthorsThunk,
  fetchAuthorThunk,
  updateAuthorThunk,
} from "redux/services/author.service";

import { initialState } from "../../types";

export const authorsSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //GET ALL AUTHORS
    builder.addCase(fetchAuthorsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAuthorsThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchAuthorsThunk.fulfilled, (state, action) => {
      state.allBooks = action.payload.data;
      state.isLoading = false;
    });

    //GET ONE AUTHOR
    builder.addCase(fetchAuthorThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAuthorThunk.fulfilled, (state, action) => {
      state.allBooks = action.payload.data;
      state.isLoading = false;
    });

    //CREATE ONE AUTHOR
    builder.addCase(createAuthorThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createAuthorThunk.fulfilled, (state, action) => {
      state.allBooks = [...state.allBooks, action.payload.data];
      state.isLoading = false;
    });

    //UPDATE ONE AUTHOR
    builder.addCase(updateAuthorThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateAuthorThunk.fulfilled, (state, action) => {
      state.allBooks = action.payload.data;
      state.isLoading = false;
    });

    //DELETE ONE AUTHOR
    builder.addCase(deleteAuthorThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteAuthorThunk.fulfilled, (state, action) => {
      state.allBooks = state.allBooks.filter(
        (book) => book._id !== action.payload.data
      );
      state.isLoading = false;
    });
  },
});

export const authorsReducer = authorsSlice.reducer;
