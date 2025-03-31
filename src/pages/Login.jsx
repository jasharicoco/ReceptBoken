import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // Importera ikoner

const Login = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Styr om lösenordet ska visas
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogin = () => {
    if (password === "mitthemligalösenord") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/admin");
    } else {
      setErrorMessage("Fel lösenord! Försök igen.");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold text-gray-800 mb-8">Admin Login</h1>

      {errorMessage && <p className="text-red-500 text-lg mb-4">{errorMessage}</p>}

      <div className="relative w-72">
        <input
          type={showPassword ? "text" : "password"}
          className="border border-gray-300 rounded-lg p-4 w-full bg-white shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none pr-12"
          placeholder="Lösenord"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />
        <button
          type="button"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOffIcon size={24} /> : <EyeIcon size={24} />}
        </button>
      </div>

      <button
        className="bg-teal-500 text-white px-6 py-3 rounded-full w-72 hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-105 mt-4"
        onClick={handleLogin}
      >
        Logga in
      </button>

      <Link to="/">
        <button className="bg-gray-500 text-white px-6 py-3 rounded-full w-72 mt-4 hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105">
          Hem
        </button>
      </Link>
    </div>
  );
};

export default Login;
