import React from "react";
import "./Sidebar.css";

function Sidebar({ onViewChange }) {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Menu</h2>
      <ul className="menu-list">
        <li className="menu-item">
          <a href="#" onClick={() => onViewChange("projects")}>
            Projects
          </a>
        </li>
        <li className="menu-item">
          <a href="#" onClick={() => onViewChange("tasks")}>
            Tasks
          </a>
        </li>
        <li className="menu-item">
          <a href="#" onClick={() => onViewChange("employees")}>
            Employees
          </a>
        </li>
        <li className="menu-item">
          <a href="#" onClick={() => onViewChange("teams")}>
            Teams
          </a>
        </li>
        <li className="menu-item">
          <a href="#" onClick={() => onViewChange("timeLogs")}>
            TimeLogs
          </a>
        </li>
        <li className="menu-item">
          <a href="#" onClick={() => onViewChange("reports")}>
            Reports
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
