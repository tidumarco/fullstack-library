import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchBooksThunk } from "redux/services/book.service";

import { AppDispatch, RootState } from "redux/store";
import { AddBookProps } from "types";

export default function AddBook() {
  const { books } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
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
  return (
    <Container>
      <Typography variant="h4">Add a new book</Typography>
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
            <TextField
              id="author-firstName-input"
              name="firstName"
              label="Author First Name"
              type="text"
              value={formData.authors.firstName}
              onChange={handleBookChange}
            />
            <TextField
              id="author-lastName-input"
              name="lastName"
              label="Author Last Name"
              type="text"
              value={formData.authors.lastName}
              onChange={handleBookChange}
            />
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
