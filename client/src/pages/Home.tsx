import { useEffect } from "react";
import BooksTable from "../components/BooksTable";

export default function Home() {
  useEffect(() => {
    console.log("");
  }, []);
  return (
    <>
      <BooksTable />
    </>
  );
}
