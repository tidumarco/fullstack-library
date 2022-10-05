import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { createAuthorThunk } from "redux/services/author.service";
import { AppDispatch } from "redux/store";
import { Author } from "types";

export default function AddAuthor() {
  const [authorData, setAuthorData] = useState<Author>({
    firstName: "",
    lastName: "",
  });
  const dispatch = useDispatch<AppDispatch>();

  const resetState = () => {
    setAuthorData({
      firstName: "",
      lastName: "",
    });
  };

  const handleSetFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorData({ ...authorData, firstName: e.target.value });
  };

  const handleSetLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorData({ ...authorData, lastName: e.target.value });
  };

  const handleAuthorSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newAuthor = {
      firstName: authorData.firstName,
      lastName: authorData.lastName,
    };
    dispatch(createAuthorThunk(newAuthor));
    e.target.reset();
    resetState();
  };

  return (
    <>
      <Typography variant="h6">Add a new author</Typography>
      <form onSubmit={handleAuthorSubmit}>
        <Grid item>
          <TextField
            id="author-firstName-input"
            name="firstName"
            label="Author First Name"
            type="text"
            value={authorData.firstName}
            onChange={handleSetFirstName}
          />
        </Grid>
        <Grid item>
          <TextField
            id="author-lastName-input"
            name="lastName"
            label="Author Last Name"
            type="text"
            value={authorData.lastName}
            onChange={handleSetLastName}
          />
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
}
