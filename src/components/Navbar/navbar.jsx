import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "myActive nav-link" : "nav-link"
            }
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "myActive nav-link" : "nav-link"
            }
            to="/about"
          >
            About
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
