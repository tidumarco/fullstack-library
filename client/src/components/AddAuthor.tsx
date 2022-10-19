import { Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import NewAuthorForm from "./NewAuthorForm";

export default function AddAuthor() {
  return (
    <>
	<Helmet>
		<title>Add Author page</title>
	</Helmet>
      <Typography variant="h2">Add a new author</Typography>
      <NewAuthorForm />
    </>
  );
}
