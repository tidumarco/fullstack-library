import { Container } from "@mui/material";
import AddAuthor from "./AddAuthor";
import AddBook from "./AddBook";
import AddUser from "./AddUser";
import EditBook from "./EditBook";

export default function Dashboard() {
  return (
    <Container>
      <AddAuthor />
      <AddUser />
      <AddBook />
      <EditBook />
    </Container>
  );
}
