import { Button, Grid, InputLabel, TextareaAutosize, TextField, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBooksThunk, updateBookThunk } from "redux/services/book.service";
import { AppDispatch, RootState } from "redux/store";

export default function UpdateBook() {
  const { bookId } = useParams<{ bookId: string }>();
  const books = useSelector((state: RootState) => state.books.allBooks);
  const book = books.find((book) => book._id === bookId);
  const [state, setState] = useState(book);
  
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!book) {
      dispatch(fetchBooksThunk());
    } else {
      setState(book);
    }
  }, [book]);

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
      dispatch(updateBookThunk(state));
      console.log(state);
      alert("Book updated!");
      window.close();
    }
  };

  if (!book) return <h1>Loading book...</h1>;
  return (
    <>
      <Typography variant="h4">Update a book: {book.title}</Typography>
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
          <InputLabel>ISBN</InputLabel>
          <TextField
            type="text"
            name="ISBN"
            value={state?.ISBN}
            defaultValue={state?.ISBN}
            placeholder="ISBN here"
            onChange={handleChange}
          />
          <InputLabel>Title</InputLabel>
          <TextField
            type="text"
            name="title"
            value={state?.title}
            defaultValue={state?.title}
            placeholder="title here"
            onChange={handleChange}
          />
          <InputLabel>Description</InputLabel>
          <TextareaAutosize
            
            name="description"
            value={state?.description}
            defaultValue={state?.description}
            placeholder="description here"
            onChange={handleChange}
          />
          <InputLabel>Publisher</InputLabel>
          <TextField
            type="text"
            name="publisher"
            value={state?.publisher}
            defaultValue={state?.publisher}
            placeholder="publisher here"
            onChange={handleChange}
          />
          <InputLabel>Published Date</InputLabel>
          <TextField
            type="date"
            name="publishedDate"
            value={state?.publishedDate}
            defaultValue={state?.publishedDate}
            placeholder="published date here"
            onChange={handleChange}
          />
          <InputLabel>Category</InputLabel>
          <TextField
            type="text"
            name="category"
            value={state?.category}
            defaultValue={state?.category}
            placeholder="category here"
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
