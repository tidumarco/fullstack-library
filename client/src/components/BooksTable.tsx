import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";

import { Book } from "types";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Link,
} from "@mui/material";
import SearchBar from "./SearchBar";
import React, { useEffect, useState } from "react";
import { deleteBookThunk, fetchBooksThunk } from "redux/services/book.service";
import { deleteAuthorThunk } from "redux/services/author.service";
import PrivateRoute from "./PrivateRoute";
import { getToken } from "redux/slices/authSlice";

export default function BooksTable() {
  const { books, authors, auth } = useSelector((state: RootState) => state);
  const [singleBookState, setSingleBookState] = useState<Book | undefined>();
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
    dispatch(fetchBooksThunk());
    dispatch(getToken());
  }, [dispatch, authors]);

  const handleBorrowerChange = (bookId: string) => {
    // const singleBook = books.allBooks.find((book) => book._id === bookId);

    // // console.log("State before thunk:", singleBookState);
    // if (singleBook) {
    //   singleBook.borrowerId = [...singleBook.borrowerId, userId];
    //   setSingleBookState(singleBook);
    //   if (singleBookState) {
    //     dispatch(updateBookThunk(singleBookState));
    //   }
    // }
    // // console.log("State after thunk:", singleBookState);
    alert("Coming soon!");
  };

  return (
    <>
      <Typography>{books.isLoading && "Loading books"}</Typography>

      <SearchBar
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        title={searchData.title}
        ISBN={searchData.ISBN}
        authors={searchData.authors}
        category={searchData.category}
      />
      <TableContainer
        component={Paper}
        sx={{
          borderBottom: "2px solid black",
          margin: "40px",
          "& th": {
            fontSize: "1.25rem",
            color: "rgba(96, 96, 96)",
          },
          width: "95%",
        }}
      >
        <Table sx={{ margin: "0, auto" }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                borderBottom: "2px solid black",
                "& th": {
                  fontSize: "1.25rem",
                  color: "rgba(96, 96, 96)",
                },
              }}
            >
              <TableCell>ISBN</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Available</TableCell>
              <TableCell>Authors</TableCell>
              <TableCell>Publisher</TableCell>
              <TableCell>Published Date</TableCell>
              <TableCell>Category</TableCell>
              <PrivateRoute>
                <TableCell>Edit</TableCell>
              </PrivateRoute>
              <PrivateRoute>
                <TableCell>Delete</TableCell>
              </PrivateRoute>
              <TableCell>Borrow</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {books.allBooks.map((book: Book) => (
              <TableRow key={book.ISBN}>
                <TableCell>{book.ISBN}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.description}</TableCell>
                <TableCell align="right">
                  {book.available ? <p>Available</p> : <p>Not Available</p>}
                </TableCell>
                <TableCell align="center">
                  {book.authors.map((auth: any) => {
                    return (
                      <p key={auth._id}>
                        {auth.firstName} {auth.lastName}
                        <br />
                        <PrivateRoute>
                          <Link
                            key={auth.lastName}
                            href={`/update-author/${auth._id}`}
                            target="_blank"
                            underline="none"
                          >
                            EDIT
                          </Link>
                        </PrivateRoute>
                        <br />
                        <PrivateRoute>
                          <button
                            color="error"
                            onClick={() => {
                              handleAuthorDelete(auth._id!);
                            }}
                          >
                            Delete
                          </button>
                        </PrivateRoute>
                      </p>
                    );
                  })}
                </TableCell>
                <TableCell align="right">{book.publisher}</TableCell>
                <TableCell align="right">
                  {book.publishedDate.toString()}
                </TableCell>

                <TableCell>{book.category}</TableCell>
                <PrivateRoute>
                  <TableCell>
                    <Link
                      href={`/update-book/${book._id}`}
                      underline="none"
                      target="_blank"
                    >
                      EDIT
                    </Link>
                  </TableCell>
                </PrivateRoute>
                <PrivateRoute>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        handleBookDelete(book._id);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </PrivateRoute>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="inherit"
                    name="borrowerId"
                    onClick={() => handleBorrowerChange(book._id)}
                  >
                    Borrow
                  </Button>
                </TableCell>
                <PrivateRoute>
                  <TableCell>{singleBookState?.borrowerId}</TableCell>
                </PrivateRoute>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
