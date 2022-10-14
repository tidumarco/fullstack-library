import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { createUserThunk } from "redux/services/user.service";
import { AppDispatch } from "redux/store";
import { User } from "types";

export default function AddUser() {
  const [userData, setUserData] = useState<User>({
    userName: "",
    email: "",
    isAdmin: false,
  });
  const dispatch = useDispatch<AppDispatch>();

  const resetState = () => {
    setUserData({
      userName: "",
      email: "",
      isAdmin: false,
    });
  };

  const handleSetUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, userName: e.target.value });
  };

  const handleSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, email: e.target.value });
  };

  const handleUserSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = {
      userName: userData.userName,
      email: userData.email,
      isAdmin: userData.isAdmin,
    };
    dispatch(createUserThunk(newUser));
    e.target.reset();
    resetState();
  };

  return (
    <>
      <Typography variant="h6">Add a new user</Typography>
      <form onSubmit={handleUserSubmit}>
        <Grid item>
          <TextField
            id="user-username-input"
            name="userName"
            label="Username"
            type="text"
            value={userData.userName}
            onChange={handleSetUserName}
          />
        </Grid>
        <Grid item>
          <TextField
            id="user-email-input"
            name="email"
            label="User Email"
            type="text"
            value={userData.email}
            onChange={handleSetEmail}
          />
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
}
