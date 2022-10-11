import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Params } from "react-router-dom";

import { User } from "types";

const URL = "http://localhost:4000/api/v1/users";

//GET ALL USERS
export const fetchUsersThunk = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get(`${URL}`);

  return {
    data: response.data,
    status: response.status,
  };
});

//GET ONE USER
export const fetchUserThunk = createAsyncThunk("user/fetch", async (userId) => {
  const response = await axios.get(`${URL}/${userId}`);

  return {
    data: response.data,
    status: response.status,
  };
});

//CREATE USER
export const createUserThunk = createAsyncThunk(
  "user/create",
  async (user: User) => {
    const response = await axios.post(`${URL}/`, user);

    return {
      data: response.data,
      status: response.status,
    };
  }
);

//UPDATE ONE USER
export const updateUserThunk = createAsyncThunk(
  "user/update",
  async (data: Params) => {
    const { userId, updatedUser } = data;

    const response = await axios.put(`${URL}/${userId}`, updatedUser);

    return {
      data: response.data,
      status: response.status,
    };
  }
);

//DELETE ONE USER
export const deleteUserThunk = createAsyncThunk(
  "user/delete",
  async (userId) => {
    const response = await axios.delete(`${URL}/${userId}`);

    return {
      data: response.data,
      status: response.status,
    };
  }
);
