import { Link } from "react-router-dom";

const AdminButton = ({ isAuthenticated }) => {
  return (
    <div>
      {isAuthenticated ? (
        <Link to="/admin">
          <button className="text-white bg-[#6b8d68] px-6 py-3 rounded-full mb-6 hover:bg-[#447049] transition duration-300 ease-in-out transform hover:scale-105">
            Admin
          </button>
        </Link>
      ) : (
        <Link to="/login">
          <button className="bg-gray-500 text-white px-6 py-3 rounded-full mb-8 hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105">
            Logga in
          </button>
        </Link>
      )}
    </div>
  );
};

export default AdminButton;
