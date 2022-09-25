import SearchBar from "components/SearchBar";
import { ChangeEvent, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchBooksThunk } from "redux/slices/booksSlice";
import { AppDispatch, RootState } from "redux/store";
import BooksTable from "../components/BooksTable";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBooksThunk());
  }, [dispatch]);

  return (
    <>
      <SearchBar />
      <BooksTable />
    </>
  );
}
