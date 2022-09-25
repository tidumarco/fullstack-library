import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";

import { Book } from "types";

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

export default function BooksTable() {
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
              <TableCell>Available</TableCell>
			  <TableCell>Category</TableCell>
              <TableCell>Created on</TableCell>
			  <TableCell>Updated on</TableCell>
			  <TableCell>Borrowed on</TableCell>
			  <TableCell>Returned on</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.items.map((book: Book) => (
              <TableRow key={book.ISBN}>
                <TableCell align="right">{book.ISBN}</TableCell>
                <TableCell align="right">{book.title}</TableCell>
                <TableCell align="right">{book.description}</TableCell>
                <TableCell align="right">
                  <ul>
                    {Object.values(book.authors).map((auth: any) => {
                      return <li key={auth.firstName}>{auth.firstName} {auth.lastName}</li>;
                    })}
                  </ul>
                </TableCell>
                <TableCell align="right">{book.borrowerId}</TableCell>
                <TableCell align="right">{book.adminId}</TableCell>
                <TableCell align="right">
                  {book.available ? (
                    <div>Available</div>
                  ) : (
                    <div>Not Available</div>
                  )}
                </TableCell>
				<TableCell>{book.category}</TableCell>
                <TableCell>{book.createdAt.toString()}</TableCell>
				<TableCell>{book.updatedAt.toString()}</TableCell>
				<TableCell>{book.borrowDate.toString()}</TableCell>
				<TableCell>{book.returnDate.toString()}</TableCell>
				
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
