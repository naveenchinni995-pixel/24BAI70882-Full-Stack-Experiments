import React from "react";
import { getUserFromToken } from "../utils/token";

function Dashboard({ logout }) {
  const user = getUserFromToken();

  return (
    <div className="dashboard-container">

      <div className="dashboard-card">

        <h1>🎉 Welcome</h1>

        <h2>{user?.username}</h2>

        <div className="user-details">

          <p>
            <strong>Email:</strong> {user?.email}
          </p>

          <p>
            <strong>Role:</strong> {user?.role}
          </p>

        </div>

        <div className="token-status">
          ✅ JWT Token Stored Successfully
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

      </div>

    </div>
  );
}

export default Dashboard;