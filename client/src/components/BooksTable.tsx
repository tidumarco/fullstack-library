import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import moment from 'moment'
import { Book } from "types";

import {
  Typography,
  Button,
  Link,
  Card,
  CardContent,
  CardActions,
  Box,
} from "@mui/material";
import SearchBar from "./SearchBar";
import React, { useEffect, useState } from "react";
import {
  deleteBookThunk,
  fetchBooksThunk,
} from "redux/services/book.service";
import { deleteAuthorThunk } from "redux/services/author.service";
import PrivateRoute from "./PrivateRoute";
import { getToken } from "redux/slices/authSlice";

export default function BooksTable() {
  const { books, authors, auth } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const [searchData, setSearchData] = useState({
    ISBN: "",
    title: "",
    authors: "",
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { ISBN, title, authors, category } = searchData;
    let filter = "";

    if (ISBN) {
      filter = `ISBN=${ISBN}&`;
    }
    if (title) {
      filter = `title=${title}&`;
    }
    if (authors) {
      filter = `title=${title}&`;
    }
    if (category) {
      filter = `title=${title}&`;
    }
    if (filter) {
      return dispatch(fetchBooksThunk({ filter }));
    }
    dispatch(fetchBooksThunk({ filter }));
  };

  const handleBookDelete = (bookId: string) => {
    dispatch(deleteBookThunk(bookId));
  };
  const handleAuthorDelete = (authId: string) => {
    dispatch(deleteAuthorThunk(authId));
  };

  useEffect(() => {
    dispatch(getToken());
    dispatch(fetchBooksThunk());
  }, []);

  return (
    <>
      <Typography>{books.isLoading && "Loading books"}</Typography>

      <SearchBar />
      <Box display="flex" width="100%" flexWrap="wrap">
        {books.allBooks.map((book: Book) => (
			<Card sx={{ minWidth: 275, maxWidth: 275, margin: 5 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {book.authors.map((auth: any) => {
                  return (
                    <p key={auth._id}>
                      {auth.firstName} {auth.lastName}
                    </p>
                  );
                })}
              </Typography>
              <Typography variant="h5" component="div">
                {book.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {book.category} 
              </Typography>
			  <Typography>{moment(book.publishedDate).utc().format('YYYY-MM-DD')}</Typography>
              <Typography
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {book.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Link
                margin="5px"
                href={`/book-details/${book._id}`}
                underline="none"
                target="_blank"
              >
                DETAILS
              </Link>
            </CardActions>
            <PrivateRoute>
              <CardActions>
                <Link
                  margin="5px"
                  href={`/update-book/${book._id}`}
                  underline="none"
                  target="_blank"
                >
                  EDIT
                </Link>
              </CardActions>
            </PrivateRoute>
            <PrivateRoute>
              <CardActions>
                <Button
				
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    handleBookDelete(book._id);
                  }}
                >
                  Delete
                </Button>
              </CardActions>
            </PrivateRoute>
          </Card>
        ))}
      </Box>
    </>
  );
}
