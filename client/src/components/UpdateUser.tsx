import { Button, Grid, InputLabel, TextField, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchUsersThunk, updateUserThunk } from "redux/services/user.service";
import { AppDispatch, RootState } from "redux/store";

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
      <Helmet>
        <title>Update user page</title>
      </Helmet>
      <Typography variant="h4">
        Update an user: {user.firstName} {user.lastName}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid
          sx={{
            border: "2px solid black",
            width: 1 / 2,
            margin: 2,
            padding: 2,
          }}
          container
          direction="column"
        >
          <InputLabel>First Name</InputLabel>

          <TextField
            type="text"
            name="firstName"
            defaultValue={state?.firstName}
            value={state?.firstName}
            placeholder="first name"
            onChange={handleChange}
          />

          <InputLabel>Last Name</InputLabel>

          <TextField
            type="text"
            name="lastName"
            defaultValue={state?.lastName}
            value={state?.lastName}
            onChange={handleChange}
          />

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Grid>
      </form>
    </>
  );
}
