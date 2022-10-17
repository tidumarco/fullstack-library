import { Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBooksThunk, updateBookThunk } from "redux/services/book.service";
import { AppDispatch, RootState } from "redux/store";
import { Book, UpdatedBook } from "types";

const bookInitialState: UpdatedBook = {
  title: "",
};
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
    console.log("rendering");
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
  console.log("State here:", state);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (state) {
      dispatch(updateBookThunk(state));
      console.log(state);
    }
  };

  if (!book) return <h1>Loading book...</h1>;
  return (
    <>
      <Typography variant="h5">Update a book: {book.title}</Typography>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <br />
        <input
          type="text"
          name="title"
          defaultValue={state?.title}
          placeholder="title here"
          onChange={handleChange}
        />
      </form>
    </>
  );
}
