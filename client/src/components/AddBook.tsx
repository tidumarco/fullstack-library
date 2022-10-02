import {
  Button,
  Container,
  FormControl,
  Grid,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchAuthorsThunk,
  fetchAuthorThunk,
} from "redux/services/author.service";
import { fetchBooksThunk } from "redux/services/book.service";

import { AppDispatch, RootState } from "redux/store";

import AddAuthor from "./AddAuthor";

export default function AddBook() {
  const { authors, books } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const [author, setAuthor] = useState([]);
  const [authorData, setAuthorData] = useState({
    firstName: "",
    lastName: "",
  });
  const [formData, setFormData] = useState({
    ISBN: "",
    title: "",
    description: "",
    publisher: "",
    publishedDate: "",
    authors: {
      firstName: "",
      lastName: "",
    },
    returnDate: "",
    adminId: "",
    category: "",
    available: true,
  });
  const handleBookSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { ISBN, title } = formData;
    let filter = "";

    if (ISBN) {
      filter = `ISBN=${ISBN}&`;
    }
    if (title) {
      filter = `title=${title}&`;
      console.log("filter", filter);
    }
    if (filter) {
      return dispatch(fetchBooksThunk({ filter }));
    }

    dispatch(fetchBooksThunk());
  };

  const handleBookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(fetchAuthorsThunk());
  }, [dispatch]);

  return (
    <Container>
      <AddAuthor />

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
              <Select onClick={fetchAuthorsThunk}>
                <ul>
                  {authors.allAuthors.map((auth: any) => {
                    return (
                      <li key={auth.firstName}>
                        {auth.firstName} {auth.lastName}
                      </li>
                    );
                  })}
                </ul>
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
            <TextField
              id="availability-input"
              name="availability"
              label="Availability"
              type="boolean"
              value={formData.available}
              onChange={handleBookChange}
            />
          </Grid>

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </form>
    </Container>
  );
}
