import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import useTheme from "../hooks/useTheme";

const Navbar = () => {
  const { color } = useTheme();

  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/" className="brand">
          <h2>Cooking Ninja</h2>
        </Link>
        <SearchBar />
        <Link to="/create">
          <p>Create Recipe</p>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
