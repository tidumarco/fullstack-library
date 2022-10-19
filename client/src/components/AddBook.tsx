import { Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import NewBookForm from "./NewBookForm";

export default function AddBook() {
  return (
    <>
      <Helmet>
        <title>Add Book page</title>
      </Helmet>
      <Typography variant="h2">Add a new book</Typography>
      <NewBookForm />
    </>
  );
}
