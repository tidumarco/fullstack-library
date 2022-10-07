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

export default function BooksTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { books } = useSelector((state: RootState) => state);

  const [searchData, setSearchData] = useState({
    ISBN: "",
    title: "",
  });

  useEffect(() => {
    dispatch(fetchBooksThunk());
  }, [dispatch]);

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

    dispatch(fetchBooksThunk());
  };
  return (
    <>
      <Typography>{books.isLoading && "Loading books"}</Typography>

      <SearchBar
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        title={searchData.title}
        ISBN={searchData.ISBN}
      />

      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: "auto" }} aria-label="simple table">
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
              <TableCell>Authors</TableCell>
              <TableCell>Publisher</TableCell>
              <TableCell>Published Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Created on</TableCell>
              <TableCell>Updated on</TableCell>
              <TableCell>Borrowed on</TableCell>
              <TableCell>Returned on</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.allBooks.map((book: Book) => (
              <TableRow key={book.ISBN}>
                <TableCell align="right">{book.ISBN}</TableCell>
                <TableCell align="right">{book.title}</TableCell>
                <TableCell align="right">{book.description}</TableCell>
                <TableCell align="right">
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
                <TableCell align="right">{book.publishedDate.toString()}</TableCell>
                <TableCell align="right">
                  {book.available ? (
                    <div>Available</div>
                  ) : (
                    <div>Not Available</div>
                  )}
                </TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>{book.createdAt.toString()}</TableCell>
                <TableCell>{book.updatedAt.toString()}</TableCell>
                <TableCell>{book.borrowDate.toString()}</TableCell>
                <TableCell>{book.returnDate.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
