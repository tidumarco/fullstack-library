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
import { useEffect, useState } from "react";
import { deleteBookThunk, fetchBooksThunk } from "redux/services/book.service";

export default function BooksTable({ authors }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const { books } = useSelector((state: RootState) => state);
  console.log(books);
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

  const handleDelete = (bookId: string) => {
	dispatch(deleteBookThunk(bookId))
  };

  useEffect(() => {
    dispatch(fetchBooksThunk());
  }, [dispatch]);

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
                <TableCell align="center">
                  {book.authors.map((auth: any) => {
                    return (
                      <>
                        <li key={auth._id}>
                          {auth.firstName} {auth.lastName}
                          <br />
                          <Link
                            key={auth.lastName}
                            href={`/update-author/${auth._id}`}
                          >
                            EDIT
                          </Link>
                        </li>
                      </>
                    );
                  })}
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
                <TableCell>
                  <Link href={`/update-book/${book._id}`}>EDIT</Link>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      handleDelete(book._id!);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
