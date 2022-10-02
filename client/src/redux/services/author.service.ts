import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Author } from "types";


const URL = "http://localhost:4000/api/v1/authors";

//GET ALL AUTHORS
export const fetchAuthorsThunk = createAsyncThunk("authors/fetch", async () => {
  const response = await axios.get(`${URL}`);
 
  return {
    data: response.data,
    status: response.status,
  };
});

//GET ONE AUTHOR
export const fetchAuthorThunk = createAsyncThunk(
  "author/fetch",
  async (authorId) => {
    const response = await axios.get(`${URL}/${authorId}`);

    return {
      data: response.data,
      status: response.status,
    };
  }
);

//CREATE AUTHOR
export const createAuthorThunk = createAsyncThunk(
  "author/create",
  async (author: Author) => {
    const response = await axios.post(`${URL}/`, author);

    return {
      data: response.data,
      status: response.status,
    };
  }
);

//UPDATE ONE AUTHOR
export const updateAuthorThunk = createAsyncThunk(
  "author/update",
  async (data: any) => {
    const { authorId, updatedAuthor } = data;

    const response = await axios.put(`${URL}/${authorId}`, updatedAuthor);

    return {
      data: response.data,
      status: response.status,
    };
  }
);

//DELETE ONE BOOK
export const deleteAuthorThunk = createAsyncThunk(
  "author/delete",
  async (authorId) => {
    const response = await axios.delete(`${URL}/${authorId}`);

    return {
      data: response.data,
      status: response.status,
    };
  }
);
