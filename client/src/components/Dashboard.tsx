import { Container, Box } from "@mui/material";
import AddAuthor from "./AddAuthor";
import AddBook from "./AddBook";
import AddUser from "./AddUser";
import EditBook from "./EditBook";

export default function Dashboard() {
  return (
    <Container sx={{ display: "flex", flexFlow: "column wrap", alignItems: "space-between" }}>
      <h1>Dashboard</h1>

      <AddAuthor />
      <AddUser />
      <AddBook />
      <EditBook />
    </Container>
  );
}
