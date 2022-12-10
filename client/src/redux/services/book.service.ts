import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { NewBook } from "types";

const origin = "http://localhost:4000";

//GET ALL BOOKS
export const fetchBooksThunk = createAsyncThunk(
  "books/fetch",
  async ({ filter }: { filter?: string } = { filter: "" }) => {
    let URL: string;
    let token = localStorage.getItem("token") || "";
    if (filter) {
      URL = `${origin}/api/v1/books/filter?${filter}`;
    } else {
      URL = `${origin}/api/v1/books`;
    }
    const response = await axios.get(`${URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      data: response.data,
      status: response.status,
    };
  }
);

//GET ONE BOOK
export const fetchBookThunk = createAsyncThunk("book/fetch", async (bookId) => {
  const response = await axios.get(`${URL}/${bookId}`);

  return {
    data: response.data,
    status: response.status,
  };
});

//CREATE BOOK
export const createBookThunk = createAsyncThunk(
  "book/create",
  async (book: NewBook) => {
    const response = await axios.post(`${origin}/api/v1/books`, book);

    return {
      data: response.data,
      status: response.status,
    };
  }
);

//UPDATE ONE BOOK
export const updateBookThunk = createAsyncThunk(
  "book/update",
  async (book: NewBook) => {
    const response = await axios.put(
      `${origin}/api/v1/books/id/${book._id}`,
      book
    );

    return {
      data: response.data,
      status: response.status,
    };
  }
);

//DELETE ONE BOOK
export const deleteBookThunk = createAsyncThunk(
  "book/delete",
  async (bookId: string) => {
    const response = await axios.delete(`${origin}/api/v1/books/id/${bookId}`);

    return {
      data: bookId,
      status: response.status,
    };
  }
);
