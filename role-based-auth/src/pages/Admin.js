import React from "react";
import Navbar from "../components/Navbar";

function Admin() {
  return (
    <>
      <Navbar />

      <div className="dashboard">

        <h1>👨‍💼 Admin Dashboard</h1>

        <div className="cards">

          <div className="card">
            <h2>👥 User Management</h2>
            <p>
              Add, update and remove users from the system.
            </p>
          </div>

          <div className="card">
            <h2>📊 Reports</h2>
            <p>
              View analytics and generate system reports.
            </p>
          </div>

          <div className="card">
            <h2>⚙️ Settings</h2>
            <p>
              Manage application settings and permissions.
            </p>
          </div>

        </div>

      </div>
    </>
  );
}

export default Admin;