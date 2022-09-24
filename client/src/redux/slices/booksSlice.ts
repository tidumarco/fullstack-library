import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

import { Book } from "../../types";

export interface booksState {
  items: Book[];
  isLoading: boolean;
}

const initialState: booksState = {
  items: [],
  isLoading: false,
};

export const fetchBooksThunk = createAsyncThunk("books/fetch", async () => {
  const url = "http://localhost:4000/api/v1/books";
  const response = await axios.get(url);
  console.log("Books fetched!")

  return {
    data: response.data as Book[],
    status: response.status,
  };
});

export const booksSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooksThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBooksThunk.fulfilled, (state, action) => {
      state.items = action.payload.data;
      state.isLoading = false;
    });
  },
});

export const booksReducer = booksSlice.reducer;
