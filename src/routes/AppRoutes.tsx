import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/Login";
import { HomePage } from "../pages/Home";
import Layout from "../ui/Layout";

const isAuthenticated = false

const AppRoutes = () => {
  return (
    <Router basename="/Kumbulink">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
