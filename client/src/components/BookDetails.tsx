import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";

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

import { useEffect, useState } from "react";
import { fetchBooksThunk, updateBookThunk } from "redux/services/book.service";

import { getToken } from "redux/slices/authSlice";
import { useParams } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { deleteAuthorThunk } from "redux/services/author.service";

export default function BooksTable() {
  const { bookId } = useParams<{ bookId: string }>();

  const { books, auth } = useSelector((state: RootState) => state);
  const book = books.allBooks.find((book) => book._id === bookId);

  const dispatch = useDispatch<AppDispatch>();
  const [state, setState] = useState(book);

  useEffect(() => {
    if (!book) {
      dispatch(fetchBooksThunk());
    } else {
      setState(book);
      dispatch(getToken());
    }
  }, [book]);

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = auth.decodedUser.userId;
    if (state) {
      setState({
        ...state,
        [name]: value,
      });
    }
  };

  const handleReturnChange = (e: any) => {
    const name = e.target.name;
    const value = null;
    if (state) {
      setState({
        ...state,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: any) => {
    if (state) {
      dispatch(updateBookThunk(state));
    }
  };

  const handleAuthorDelete = (authId: string) => {
    dispatch(deleteAuthorThunk(authId));
  };
  return (
    <>
      <Typography variant="h4">{book?.title}</Typography>
      <TableContainer>
        <form onSubmit={handleSubmit}>
          <Table
            sx={{
              border: "2px solid black",
              width: 1 / 2,
              margin: 2,
              padding: 2,
            }}
            aria-label="simple table"
          >
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
                <TableCell>Borrow</TableCell>
                <TableCell>Return</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell>{book?.ISBN}</TableCell>
              <TableCell>{book?.title}</TableCell>
              <TableCell>{book?.description}</TableCell>
              <TableCell align="right">
                {book?.available ? <p>Available</p> : <p>Not Available</p>}
              </TableCell>
              <TableCell align="center">
                {book?.authors.map((auth: any) => {
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
                        <Button
                          color="error"
                          onClick={() => {
                            handleAuthorDelete(auth._id!);
                          }}
                        >
                          Delete
                        </Button>
                      </PrivateRoute>
                    </p>
                  );
                })}
              </TableCell>
              <TableCell align="right">{book?.publisher}</TableCell>
              <TableCell align="right">
                {book?.publishedDate.toString()}
              </TableCell>
              <TableCell>{book?.category}</TableCell>
              <TableCell>
                {book?.borrowerId ? (
                  <Button disabled color="secondary">
                    borrow
                  </Button>
                ) : (
                  <Button
                    name="borrowerId"
                    type="submit"
                    variant="outlined"
                    color="inherit"
                    onClick={handleChange}
                  >
                    borrow
                  </Button>
                )}
              </TableCell>
              <TableCell>
                {!book?.borrowerId ? (
                  <Button disabled color="secondary">
                    return
                  </Button>
                ) : (
                  <Button
                    name="borrowerId"
                    type="submit"
                    variant="outlined"
                    color="inherit"
                    onClick={handleReturnChange}
                  >
                    return
                  </Button>
                )}
              </TableCell>
            </TableBody>
          </Table>
        </form>
      </TableContainer>
    </>
  );
}
