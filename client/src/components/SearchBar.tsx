import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";

import { useState } from "react";
import { Button, TextField } from "@mui/material";

import { SearchBarProps } from "types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { fetchBooksThunk } from "redux/services/book.service";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { fetchTokenThunk } from "redux/services/auth.service";

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
  const [open, setOpen] = useState(false);
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

  const handleBookSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { ISBN, title, category } = formData;
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            TIDU LIBRARY
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
            <Search sx={{ flexGrow: 1 }}>
              <TextField
                placeholder="Search author"
                type="text"
                name="author"
                onChange={handleBookChange}
              />
            </Search>
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
