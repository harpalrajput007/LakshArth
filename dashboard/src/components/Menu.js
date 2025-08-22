import React from "react";
import { NavLink } from "react-router-dom";

const Menu = () => {
  const getClass = ({ isActive }) => (isActive ? "menu selected" : "menu");

  return (
    <div className="menu-container">
      <img src="TARK.png" style={{ width: "50px" }} alt="TARK" />
      <div className="menus">
        <ul>
          <li>
            <NavLink end to="/" style={{ textDecoration: "none" }} className={getClass}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" style={{ textDecoration: "none" }} className={getClass}>
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/holdings" style={{ textDecoration: "none" }} className={getClass}>
              Holdings
            </NavLink>
          </li>
          <li>
            <NavLink to="/positions" style={{ textDecoration: "none" }} className={getClass}>
              Positions
            </NavLink>
          </li>
          <li>
            <NavLink to="/funds" style={{ textDecoration: "none" }} className={getClass}>
              Funds
            </NavLink>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  );
};

export default Menu;
