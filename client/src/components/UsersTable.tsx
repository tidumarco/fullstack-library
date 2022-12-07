import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersThunk } from "redux/services/user.service";
import { AppDispatch, RootState } from "redux/store";

export default function UsersTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  if (!users) return <h1>Loading users...</h1>;

  return (
    <>
      <Typography variant="h2">Users</Typography>
      <TableContainer>
        <Table
          sx={{
            border: "2px solid black",
            width: 1 / 2,
            margin: 2,
            padding: 2,
          }}
          aria-label="simple table"
        >
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
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
			  <TableCell>Email</TableCell>
			  <TableCell>Is Admin</TableCell>
			  <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.allUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
				<TableCell>{user.email}</TableCell>
				<TableCell>{JSON.stringify(user.isAdmin)}</TableCell>
                <TableCell>
                  <Link
                    key={user._id}
                    href={`/update-user/${user._id}`}
                    target="_blank"
                    underline="none"
                  >
                    EDIT
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
