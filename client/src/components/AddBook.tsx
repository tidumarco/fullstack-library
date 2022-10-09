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

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchAuthorsThunk } from "redux/services/author.service";
import { createBookThunk } from "redux/services/book.service";

import { AppDispatch, RootState } from "redux/store";
import { Book } from "types";

import AddAuthor from "./AddAuthor";
import EditBook from "./EditBook";

export default function AddBook() {
  const { authors } = useSelector((state: RootState) => state);
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

  const [formData, setFormData] = useState<Book>(initialBook);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    dispatch(fetchAuthorsThunk());
  }, [dispatch]);

  const resetState = () => {
    setFormData(initialBook);
  };
  const handleBookSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createBookThunk(formData));
    e.target.reset();
    resetState();
    console.log(formData);
  };
  const handleBookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAvailableChange = (e: SelectChangeEvent) => {
    setFormData({ ...formData, available: !formData.available });
  };

  const handleAuthorChange = (e: SelectChangeEvent) => {
    const authorId = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      authors: [...prevState.authors, authorId],
    }));
  };

  return (
    <>
      <Typography variant="h6">Add a new book</Typography>
      <form onSubmit={handleBookSubmit}>
        <Grid>
          <Grid item>
            <TextField
              id="ISBN-input"
              name="ISBN"
              label="ISBN"
              type="text"
              value={formData.ISBN}
              onChange={handleBookChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="title-input"
              name="title"
              label="Title"
              type="text"
              value={formData.title}
              onChange={handleBookChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="description-input"
              name="description"
              label="Description"
              type="text"
              value={formData.description}
              onChange={handleBookChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="publisher-input"
              name="publisher"
              label="Publisher"
              type="text"
              value={formData.publisher}
              onChange={handleBookChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="publishedDate-input"
              name="publishedDate"
              type="date"
              value={formData.publishedDate}
              onChange={handleBookChange}
            />
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <InputLabel>Author</InputLabel>
              <Select
                label="Author"
                name="Author"
                onChange={handleAuthorChange}
              >
                {authors.allAuthors.map((author) => {
                  return (
                    <MenuItem
                      key={author._id}
                    //   value={author._id}
                      onChange={handleClose}
                    >
                      {author.firstName} {author.lastName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              id="category-input"
              name="category"
              label="Category"
              type="text"
              value={formData.category}
              onChange={handleBookChange}
            />
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <Select
                value={formData.available.toString()}
                onChange={handleAvailableChange}
              >
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </form>
    </>
  );
}
