import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar">
    <h1>Blog System</h1>
    <Link to="/">Home</Link>
  </nav>
);

export default Navbar;