import React from "react";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Menu</h2>
      <ul className="menu-list">
        <li className="menu-item">
          <a href="#">Projects</a>
        </li>
        <li className="menu-item">
          <a href="#">Tasks</a>
        </li>
        <li className="menu-item">
          <a href="#">Calendar</a>
        </li>
        <li className="menu-item">
          <a href="#">Reports</a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
