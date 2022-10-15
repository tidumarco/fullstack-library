import { Typography } from "@mui/material";

import NewAuthorForm from "./NewAuthorForm";

export default function AddAuthor() {
  return (
    <>
      <Typography variant="h3">Add a new author</Typography>
      <NewAuthorForm />
    </>
  );
}
