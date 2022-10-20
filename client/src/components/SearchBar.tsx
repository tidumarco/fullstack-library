import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DecodedUser, SearchBarProps } from "types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { fetchBooksThunk } from "redux/services/book.service";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { fetchTokenThunk } from "redux/services/auth.service";
import PrivateRoute from "./PrivateRoute";
import jwt_decode from "jwt-decode";
import { fetchUsersThunk } from "redux/services/user.service";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export default function SearchAppBar({
  ISBN,
  title,
  authors,
  category,
}: SearchBarProps) {
  const token = localStorage.getItem("token") || "";
  const authUser = jwt_decode(token) as DecodedUser;
  const userId = authUser.userId;
  const users = useSelector((state: RootState) => state.users.allUsers);
  const activeUser = users.find((user) => user._id === userId);
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    ISBN: "",
    title: "",
    description: "",
    publisher: "",
    publishedDate: new Date(0),
    authors: "",
    borrowerId: "",
    adminId: "",
    category: "",
    available: true,
  });

  useEffect(() => {
    if (!activeUser) {
      dispatch(fetchUsersThunk());
    }
  }, [activeUser, dispatch]);

  const handleBookSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { ISBN, title, category, authors } = formData;
    let filter = "";
    if (ISBN) {
      filter += `ISBN=${ISBN}&`;
    }
    if (title) {
      filter += `title=${title}&`;
    }
    if (category) {
      filter += `category=${category}&`;
    }

    if (authors) {
      filter += `authors=${authors}&`;
    }

    if (filter) {
      console.log("filter", filter);
      return dispatch(fetchBooksThunk({ filter }));
    }

    dispatch(fetchBooksThunk({ filter }));
  };

  const handleBookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleGoogleOnSuccess = async (response: CredentialResponse) => {
    dispatch(fetchTokenThunk(response));
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <PrivateRoute>
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              color="inherit"
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
          </PrivateRoute>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <Link href={`/create-author`} color="inherit" target="_blank" underline="none">
                Create an author
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link href={`/create-book`} color="inherit" target="_blank" underline="none">
                Create a book
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link href={`/users`} color="inherit" target="_blank" underline="none">
                Edit an user
              </Link>
            </MenuItem>
          </Menu>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            TIDU LIBRARY
            <br />
            Hello, {activeUser?.firstName}!
          </Typography>

          <GoogleLogin
            onSuccess={handleGoogleOnSuccess}
            onError={() => {
              console.log("Login Failed");
            }}
          />

          <form style={{ display: "flex" }} onSubmit={handleBookSubmit}>
            <Search>
              <TextField
                placeholder="Search title"
                type="text"
                name="title"
                onChange={handleBookChange}
              />
            </Search>
            <Search sx={{ flexGrow: 1 }}>
              <TextField
                placeholder="Search ISBN"
                type="text"
                name="ISBN"
                onChange={handleBookChange}
              />
            </Search>
            {/* <Search sx={{ flexGrow: 1 }}>
              <TextField
                placeholder="Search author"
                type="text"
                name="authors"
                onChange={handleBookChange}
              />
            </Search> */}
            <Search sx={{ flexGrow: 1 }}>
              <TextField
                placeholder="Search category"
                type="text"
                name="category"
                onChange={handleBookChange}
              />
            </Search>
            <Button type="submit" variant="contained">
              Search
            </Button>
          </form>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
