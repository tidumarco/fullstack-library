import { createSlice } from "@reduxjs/toolkit";
import {
  createBookThunk,
  deleteBookThunk,
  fetchBooksThunk,
  fetchBookThunk,
  updateBookThunk,
} from "redux/services/book.service";

import { initialState } from "../../types";

export const booksSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //GET ALL BOOKS
    builder.addCase(fetchBooksThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBooksThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchBooksThunk.fulfilled, (state, action) => {
      state.allBooks = action.payload.data;
      state.isLoading = false;
    });

    //GET ONE BOOK
    builder.addCase(fetchBookThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBookThunk.fulfilled, (state, action) => {
      state.allBooks = action.payload.data;
      state.isLoading = false;
    });

    //CREATE ONE BOOK
    builder.addCase(createBookThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createBookThunk.fulfilled, (state, action) => {
      state.allBooks = [...state.allBooks, action.payload.data];
      state.isLoading = false;
    });

    //UPDATE ONE BOOK
    builder.addCase(updateBookThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateBookThunk.fulfilled, (state, action) => {
      state.allBooks = action.payload.data;
      state.isLoading = false;
    });

    //DELETE ONE BOOK
    builder.addCase(deleteBookThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBookThunk.fulfilled, (state, action) => {
      state.allBooks = state.allBooks.filter(
        (book) => book._id !== action.payload.data
      );
      state.isLoading = false;
    });
  },
});

export const booksReducer = booksSlice.reducer;
