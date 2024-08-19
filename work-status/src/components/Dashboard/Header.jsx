import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css"; // CSS dosyanız

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); // useNavigate hook'u yönlendirme için

  const handleLogout = () => {
    // Burada gerekli çıkış işlemlerini yapın (örn. oturum kapatma işlemleri)
    navigate("/login"); // Kullanıcıyı login sayfasına yönlendirir
  };

  return (
    <div className="header">
      <div className="header-title">Work Status</div>
      <div className="user-menu">
        <button
          className="user-menu-button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          Username <i className="fa fa-caret-down"></i>
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
