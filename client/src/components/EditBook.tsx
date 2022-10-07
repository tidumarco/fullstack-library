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
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

export default function EditBook() {
  const { books } = useSelector((state: RootState) => state);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleBookChange = (e: SelectChangeEvent) => {
    console.log("Book selected");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Typography variant="h6">Edit a book</Typography>
      <FormControl fullWidth>
        <Select name="Book" onChange={handleBookChange}>
          {books.allBooks.map((book) => {
            return (
              <MenuItem key={book._id} value={book._id} onChange={handleClose}>
                {book.title}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
}
