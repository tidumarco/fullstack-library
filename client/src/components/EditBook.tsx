import { BookmarkAddSharp } from "@mui/icons-material";
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
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

export default function EditBook() {
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedBook, setSelectedBook] = useState(initialBook);

  const handleBookChange = (e: SelectChangeEvent) => {
    setSelectedBook({ ...selectedBook, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSelectedBook(initialBook);
  };
  console.log({ selectedBook });

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Typography variant="h6">Edit a book</Typography>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <Select name="_id" onChange={handleBookChange}>
            {books.allBooks.map((book) => {
              return (
                <MenuItem
                  key={book._id}
                  value={book._id}
                  onChange={handleClose}
                >
                  {book.title}
                </MenuItem>
              );
            })}
          </Select>
			
          <Grid>
            <Grid item>
              <TextField
                id="ISBN-input"
                name="ISBN"
                label="ISBN"
                type="text"
                value={selectedBook.ISBN}
              />
            </Grid>
          </Grid>
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
}
