import { useState } from "react";
import { fetchBooksThunk } from "redux/services/book.service";
import BooksTable from "../components/BooksTable";

export default function Home() {
  return <BooksTable />;
}
