// Importerar nödvändiga bibliotek och komponenter
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // För att visa felmeddelanden
  const navigate = useNavigate();

  // Om användaren redan är inloggad, navigera direkt till admin-sidan
  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      navigate("/admin");
    }
  }, [navigate]);

  // Inloggningsfunktion
  const handleLogin = () => {
    if (password === "mitthemligalösenord") {
      // Sätt isAuthenticated i localStorage
      localStorage.setItem("isAuthenticated", "true");
      navigate("/admin"); // Navigera till admin-sidan
    } else {
      setErrorMessage("Fel lösenord! Försök igen.");
    }
  };

  // RENDERING AV INLOGGNINGSSIDAN
  // Om användaren är inloggad, navigera till admin-sidan
  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold text-gray-800 mb-8">Admin Login</h1>
  
      {/* Visa felmeddelande om lösenordet är fel */}
      {errorMessage && (
        <p className="text-red-500 text-lg mb-4">{errorMessage}</p>
      )}
  
      {/* Lösenordsinput */}
      <input
        type="password"
        className="border border-gray-300 rounded-lg p-4 w-72 bg-white shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none mb-6"
        placeholder="Lösenord"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
  
      {/* Logga in-knapp */}
      <button
        className="bg-teal-500 text-white px-6 py-3 rounded-full w-72 hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-105"
        onClick={handleLogin}
      >
        Logga in
      </button>

      {/* Hem-knapp */}
      <Link to="/">
        <button className="bg-gray-500 text-white px-6 py-3 rounded-full w-72 mt-4 hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105">
          Hem
        </button>
      </Link>
    </div>
  );  
};

export default Login;
