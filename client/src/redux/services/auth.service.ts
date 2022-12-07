import { CredentialResponse } from "@react-oauth/google";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { DecodedUser } from "types";

export const fetchTokenThunk = createAsyncThunk(
  "auth/fetch",
  async (response: CredentialResponse) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/login",
        {},
        {
          headers: {
            id_token: response.credential as string,
          },
        }
      );
      const token = res.data.token;
	  const decodedUser:DecodedUser = jwt_decode(token);

      localStorage.setItem("token", token);
      return {
        data: res.data.token,
		decodedUser,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  }
);
