import { Button, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBooksThunk, updateBookThunk } from "redux/services/book.service";
import {
  fetchUsersThunk,
  fetchUserThunk,
  updateUserThunk,
} from "redux/services/user.service";
import { AppDispatch, RootState } from "redux/store";
import { Book, UpdatedBook } from "types";

export default function UpdateBook() {
  const { userId } = useParams<{ userId: string }>();
  const users = useSelector((state: RootState) => state.users.allUsers);

  const user = users.find((user) => user._id === userId);

  const dispatch = useDispatch<AppDispatch>();
  const [state, setState] = useState(user);
  console.log("State id:", state?._id);
  useEffect(() => {
    if (!user) {
      dispatch(fetchUsersThunk());
    } else {
      setState(user);
    }
  }, [user, dispatch]);

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    if (state) {
      setState({
        ...state,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (state) {
      dispatch(updateUserThunk(state));
      console.log(state);
      alert("User updated!");
    }
  };

  if (!user) return <h1>Loading user...</h1>;
  return (
    <>
      <Typography variant="h5">
        Update an user: {user.firstName} {user.lastName}
      </Typography>

      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <br />
        <input
          type="text"
          name="firstName"
          defaultValue={state?.firstName}
          placeholder="first name"
          onChange={handleChange}
        />
        <br />
        <label>Last Name</label>
		<br />
        <input
          type="text"
          name="lastName"
          defaultValue={state?.lastName}
          placeholder="last name"
          onChange={handleChange}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
}
