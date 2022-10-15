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
} from "@mui/material";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import { fetchBooksThunk } from "redux/services/book.service";
import { fetchTokenThunk } from "redux/services/auth.service";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

export default function BooksTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { books } = useSelector((state: RootState) => state);
  const { auth } = useSelector((state: RootState) => state);

  const [searchData, setSearchData] = useState({
    ISBN: "",
    title: "",
  });

  console.log("Token in frontend here:", auth.token);
  console.log("Books here:", books.allBooks);
  const filter = undefined;

  useEffect(() => {
    dispatch(fetchBooksThunk({ filter }));
  }, [dispatch, auth.token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleGoogleOnSuccess = async (response: CredentialResponse) => {
    dispatch(fetchTokenThunk(response));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { ISBN, title } = searchData;
    let filter = "";

    if (ISBN) {
      filter = `ISBN=${ISBN}&`;
    }
    if (title) {
      filter = `title=${title}&`;
    }
    if (filter) {
      return dispatch(fetchBooksThunk({ filter }));
    }
    dispatch(fetchBooksThunk({ filter }));
  };

  return (
    <>
      <Typography>{books.isLoading && "Loading books"}</Typography>
      <GoogleLogin
        onSuccess={handleGoogleOnSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      <SearchBar
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        title={searchData.title}
        ISBN={searchData.ISBN}
      />
      {/* <LoginButton /> */}
      <TableContainer component={Paper}>
        <Table
          sx={{ width: "95%", margin: "0, auto" }}
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
              <TableCell>Created on</TableCell>
              <TableCell>Updated on</TableCell>
              {/* <TableCell>Borrowed on</TableCell>
              <TableCell>Returned on</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {books.allBooks.map((book: Book) => (
              <TableRow key={book.ISBN}>
                <TableCell>{book.ISBN}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.description}</TableCell>
                <TableCell align="right">
                  {book.available ? (
                    <div>Available</div>
                  ) : (
                    <div>Not Available</div>
                  )}
                </TableCell>
                <TableCell>
                  <ul>
                    {book.authors.map((auth: any) => {
                      return (
                        <li key={auth._id}>
                          {auth.firstName} {auth.lastName}
                        </li>
                      );
                    })}
                  </ul>
                </TableCell>
                <TableCell align="right">{book.publisher}</TableCell>
                <TableCell align="right">
                  {book.publishedDate.toString()}
                </TableCell>

                <TableCell>{book.category}</TableCell>
                <TableCell>{book.createdAt.toString()}</TableCell>
                <TableCell>{book.updatedAt.toString()}</TableCell>
                {/* <TableCell>{book.borrowDate.toString()}</TableCell>
                <TableCell>{book.returnDate.toString()}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
