import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserNameFromToken } from "./Auth";
import "./Header.css";

function Header({ onWorkStatusClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const name = getUserNameFromToken(token);
    setUserName(name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="header-title" onClick={onWorkStatusClick}>
        Work Status
      </div>
      <div className="user-menu">
        <button
          className="user-menu-button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {userName || "Username"} <i className="fa fa-caret-down"></i>
        </button>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
