import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
} from "@mui/material";
import SearchBar from "components/SearchBar";
import { ChangeEvent, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchBooksThunk } from "redux/slices/booksSlice";
import { AppDispatch, RootState } from "redux/store";
import BooksTable from "../components/BooksTable";

export default function Home() {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { books } = useSelector((state: RootState) => state);

  const filteredBooks = books.items.filter((book) => {
    const searchBook = search.toLowerCase();
    const bookTitle = book.title.toLowerCase();
    const bookStatus = book.available;
    // return searchBook ? bookTitle.startsWith(searchBook) : book;
    if (searchBook == "available") {
      return bookStatus;
    } else {
      return book;
    }
  });

  useEffect(() => {
    dispatch(fetchBooksThunk());
  }, [dispatch]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <SearchBar handleChange={onChange} />
      <BooksTable filter={filteredBooks} />
    </>
  );
}
