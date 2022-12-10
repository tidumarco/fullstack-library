import {
  Button,
  Grid,
  InputLabel,
  NativeSelect,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAuthorsThunk } from "redux/services/author.service";
import { fetchBooksThunk, updateBookThunk } from "redux/services/book.service";
import { AppDispatch, RootState } from "redux/store";
import { Author } from "types";

export default function UpdateBook() {
  const { bookId } = useParams<{ bookId: string }>();
  const books = useSelector((state: RootState) => state.books.allBooks);
  const book = books.find((book) => book._id === bookId);
  const [state, setState] = useState(book);
  const { authors } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!book) {
      dispatch(fetchAuthorsThunk());
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
      console.log(state.authors);
      alert("Book updated!");
      window.close();
    }
  };
console.log(state?.authors)
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
            value={moment(state?.publishedDate).utc().format('yyyy-MM-DD')}
            defaultValue={moment(state?.publishedDate).utc().format('yyyy-MM-DD')}
            placeholder="published date here"
            onChange={handleChange}
          />
          <InputLabel>Authors</InputLabel>
          <NativeSelect name="authors" value={state?.authors} onChange={handleChange}>
			{authors.allAuthors.map((author:Author) => {
				return (
					<option value={author._id} key={author._id}>{author.firstName} {author.lastName}</option>
				)
			})}
          </NativeSelect>

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
