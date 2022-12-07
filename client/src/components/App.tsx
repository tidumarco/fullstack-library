import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import PrivateRoute from "./PrivateRoute";
import AddBook from "./AddBook";

import AddAuthor from "./AddAuthor";
import UpdateBook from "./UpdateBook";
import UpdateAuthor from "./UpdateAuthor";
import UpdateUsers from "./UpdateUser";
import UsersTable from "./UsersTable";
import Login from "./Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
		<Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/create-book"
          element={
            <PrivateRoute>
              <AddBook />
            </PrivateRoute>
          }
        />
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
