import React from 'react';
import { Link } from "react-router-dom";

const HomeButton = () => (
  <Link to="/">
    <button className="text-white bg-[#6b8d68] px-6 py-3 rounded-full mb-6 hover:bg-[#447049] transition duration-300 ease-in-out transform hover:scale-105">
      Hem
    </button>
  </Link>
);

export default HomeButton;
