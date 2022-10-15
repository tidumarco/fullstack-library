import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import PrivateRoute from "./PrivateRoute";
import AddBook from "./AddBook";

import AddAuthor from "./AddAuthor";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/create-book"
          element={
            // <PrivateRoute>
            <AddBook />
            // </PrivateRoute>
          }
        />
        <Route path="/create-author" element={<AddAuthor />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
