import {
  SelectChangeEvent,
  Typography,
} from "@mui/material";

// import { useEffect, useState } from "react";

// import { useDispatch, useSelector } from "react-redux";

// import { fetchAuthorsThunk } from "redux/services/author.service";
// import { createBookThunk } from "redux/services/book.service";

// import { AppDispatch, RootState } from "redux/store";
// import { Book } from "types";
import NewBookForm from "./NewBookForm";

export default function AddBook() {
//   const { authors } = useSelector((state: RootState) => state);
//   const dispatch = useDispatch<AppDispatch>();

//   const initialBook = {
//     _id: "",
//     ISBN: "",
//     title: "",
//     description: "",
//     borrowerId: "",
//     borrowDate: new Date(),
//     publisher: "",
//     publishedDate: new Date(),
//     authors: [],
//     returnDate: new Date(),
//     adminId: "",
//     category: "",
//     available: true,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   };

//   const [formData, setFormData] = useState<Book>(initialBook);
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

//   useEffect(() => {
//     dispatch(fetchAuthorsThunk());
//   }, [dispatch]);

//   const resetState = () => {
//     setFormData(initialBook);
//   };
//   const handleBookSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     dispatch(createBookThunk(formData));
//     e.target.reset();
//     resetState();
//     console.log(formData);
//   };
//   const handleBookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData((prevState) => {
//       return {
//         ...prevState,
//         [e.target.name]: e.target.value,
//       };
//     });
//   };

//   const open = Boolean(anchorEl);

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleAvailableChange = (e: SelectChangeEvent) => {
//     setFormData({ ...formData, available: !formData.available });
//   };

//   const handleAuthorChange = (e: SelectChangeEvent) => {
//     const authorId = e.target.value;
//     setFormData((prevState) => ({
//       ...prevState,
//       authors: [...prevState.authors, authorId],
//     }));
//   };

  return (
    <>
      <Typography variant="h3">Add a new book</Typography>
      <NewBookForm />
    </>
  );
}
