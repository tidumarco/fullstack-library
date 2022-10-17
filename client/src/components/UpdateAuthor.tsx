import { Button, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchAuthorsThunk,
  updateAuthorThunk,
} from "redux/services/author.service";

import { AppDispatch, RootState } from "redux/store";

export default function UpdateBook() {
  const { authorId } = useParams<{ authorId: string }>();
  const authors = useSelector((state: RootState) => state.authors.allAuthors);
  const author = authors.find((author) => author._id === authorId);

  const [state, setState] = useState(author);
  
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!author) {
      dispatch(fetchAuthorsThunk());
    } else {
      setState(author);
    }
    // console.log("rendering");
  }, [author]);

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

  console.log(state)
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (state) {
      dispatch(updateAuthorThunk(state));
      console.log(state);
      alert("Author updated!");
    }
  };

  if (!author) return <h1>Loading author...</h1>;
  return (
    <>
      <Typography variant="h5">
        Update an author: {author.firstName} {author.lastName}
      </Typography>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <br />
        <input
          type="text"
          name="firstName"
          defaultValue={state?.firstName}
          placeholder="first name here"
          onChange={handleChange}
        />
        <label>Last Name</label>
        <br />
        <input
          type="text"
          name="lastName"
          defaultValue={state?.lastName}
          placeholder="last name here"
          onChange={handleChange}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
}
