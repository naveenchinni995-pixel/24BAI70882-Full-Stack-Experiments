import React from "react";
import Navbar from "../components/Navbar";

function Viewer() {
  return (
    <>
      <Navbar />

      <div className="dashboard">

        <h1>👀 Viewer Dashboard</h1>

        <div className="cards">

          <div className="card">
            <h2>📚 View Content</h2>
            <p>
              Read and browse available content.
            </p>
          </div>

          <div className="card">
            <h2>📊 View Reports</h2>
            <p>
              Access reports available to viewers.
            </p>
          </div>

          <div className="card">
            <h2>👤 Profile</h2>
            <p>
              View your profile information.
            </p>
          </div>

        </div>

      </div>
    </>
  );
}

export default Viewer;