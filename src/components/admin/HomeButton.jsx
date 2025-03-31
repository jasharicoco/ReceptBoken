import React from 'react';
import { Link } from "react-router-dom";

const HomeButton = () => (
  <Link to="/">
    <button className="text-white bg-teal-500 px-6 py-3 rounded-full mb-6 hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-105">
      Hem
    </button>
  </Link>
);

export default HomeButton;
