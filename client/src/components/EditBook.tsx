import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooksThunk } from "redux/services/book.service";
import { AppDispatch, RootState } from "redux/store";

export default function EditBook() {
  const dispatch = useDispatch<AppDispatch>();
  const initialBook = {
    _id: "",
    ISBN: "",
    title: "",
    description: "",
    borrowerId: "",
    borrowDate: new Date(),
    publisher: "",
    publishedDate: new Date(),
    authors: [],
    returnDate: new Date(),
    adminId: "",
    category: "",
    available: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const { books } = useSelector((state: RootState) => state);
  console.log("🚀 ~ file: EditBook.tsx ~ line 38 ~ EditBook ~ books", books);
  const [selectedBook, setSelectedBook] = useState(initialBook);

  const handleBookChange = (e: SelectChangeEvent) => {
    setSelectedBook({ ...selectedBook, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSelectedBook(initialBook);
  };
  console.log({ selectedBook });
const filter = undefined
  useEffect(() => {
    dispatch(fetchBooksThunk({filter}));
  }, [dispatch]);
  return (
    <>
      <Typography variant="h6">Edit a book</Typography>
      <form onSubmit={handleSubmit}>
        <Grid item>
          <Select
            style={{ minWidth: 200 }}
            name="_id"
            onChange={handleBookChange}
          >
            {books.allBooks.map((book) => {
              return (
                <MenuItem key={book._id} value={book._id}>
                  {book.title}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
      </form>
    </>
  );
}
