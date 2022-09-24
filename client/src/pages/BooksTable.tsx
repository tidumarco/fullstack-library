import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";

import { BasicTable, Book } from "types";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

export default function BooksTable({ filter }: BasicTable) {
  const dispatch = useDispatch<AppDispatch>();
  const { books } = useSelector((state: RootState) => state);
  return (
    <>
      <Typography>{books.isLoading && "Loading books"}</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: "auto" }} aria-label="simple table">
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
              <TableCell>Authors</TableCell>
              <TableCell>Borrower ID</TableCell>
              <TableCell>Admin ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filter.map((book: Book) => (
              <TableRow key={book.ISBN}>
                <TableCell align="right">{book.ISBN}</TableCell>
                <TableCell align="right">{book.title}</TableCell>
                <TableCell align="right">{book.description}</TableCell>
                <TableCell align="right">{book.authors}</TableCell>
                <TableCell align="right">{book.borrowerId}</TableCell>
                <TableCell align="right">{book.adminId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}