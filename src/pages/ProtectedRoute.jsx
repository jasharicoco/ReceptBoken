// Importerar nödvändiga bibliotek och komponenter
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Kolla om användaren är autentiserad
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  // RENDERING AV SKYDDAD RUTT
  // Om användaren är autentiserad, visa barnkomponenterna
  // Om användaren inte är autentiserad, navigera till inloggningssidan
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Annars, visa barnkomponenterna
  // (dvs. den skyddade sidan)
  return children;
};

export default ProtectedRoute;
