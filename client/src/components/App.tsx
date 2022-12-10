import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "pages/Home";
import AddBook from "./AddBook";
import "../App.css";
import AddAuthor from "./AddAuthor";
import UpdateBook from "./UpdateBook";
import UpdateAuthor from "./UpdateAuthor";
import UpdateUsers from "./UpdateUser";
import UsersTable from "./UsersTable";
import Login from "./Login";
import BookDetails from "./BookDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/book-details/:bookId" element={<BookDetails />} />
        <Route path="/create-book" element={<AddBook />} />
        <Route path="/create-author" element={<AddAuthor />} />
        <Route path="/update-book/:bookId" element={<UpdateBook />} />
        <Route path="/update-author/:authorId" element={<UpdateAuthor />} />
        <Route path="/update-user/:userId" element={<UpdateUsers />} />
        <Route path="/users" element={<UsersTable />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
