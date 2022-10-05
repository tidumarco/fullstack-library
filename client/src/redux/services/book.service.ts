import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Book, PutType } from "types";

const origin = "http://localhost:4000";

//GET ALL BOOKS
export const fetchBooksThunk = createAsyncThunk(
  "books/fetch",
  async ({ filter }: { filter?: string } = { filter: "" }) => {
    let URL: string;

    if (filter) {
      URL = `${origin}/api/v1/books/filter?${filter}`;
    } else {
      URL = `${origin}/api/v1/books`;
    }
    const response = await axios.get(`${URL}`);

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
  async (book: Book) => {
    console.log("redux", book);

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
  async (data: PutType) => {
    const { bookId, updatedBook } = data;
    //@ts-ignore
    const response = await axios.get(`${URL}/${bookId}`, updatedBook);

    return {
      data: response.data,
      status: response.status,
    };
  }
);

//DELETE ONE BOOK
export const deleteBookThunk = createAsyncThunk(
  "book/delete",
  async (bookId) => {
    const response = await axios.get(`${URL}/${bookId}`);

    return {
      data: response.data,
      status: response.status,
    };
  }
);
