import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
