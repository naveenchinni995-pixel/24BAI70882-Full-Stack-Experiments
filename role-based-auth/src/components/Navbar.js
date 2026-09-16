import React from "react";
import { useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/token";

function Navbar() {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">

      <div className="logo">
        🔐 RBAC Dashboard
      </div>

      <div className="nav-user">

        <span>
          👤 <strong>{user?.username}</strong>
        </span>

        <span>
          🏷️ {user?.role}
        </span>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;