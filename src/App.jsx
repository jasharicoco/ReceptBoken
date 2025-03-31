import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ProtectedRoute from "./pages/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* Home route är alltid tillgänglig */}
      <Route path="/" element={<Home />} />

      {/* Login route */}
      <Route path="/login" element={<Login />} />

      {/* Admin route är skyddad */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
