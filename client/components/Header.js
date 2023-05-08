import React from "react";
import { Link } from "react-router-dom";
import '../index.css'
const Navbar = () => {
  return (
    <nav>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/get-user-data">Get User Data</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
