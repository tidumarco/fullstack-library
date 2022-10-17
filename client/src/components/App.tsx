import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import PrivateRoute from "./PrivateRoute";
import AddBook from "./AddBook";

import AddAuthor from "./AddAuthor";
import UpdateBook from "./UpdateBook";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
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
      </Routes>
    </BrowserRouter>
  );
};
export default App;
