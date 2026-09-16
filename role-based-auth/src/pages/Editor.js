import React from "react";
import Navbar from "../components/Navbar";

function Editor() {
  return (
    <>
      <Navbar />

      <div className="dashboard">

        <h1>✍️ Editor Dashboard</h1>

        <div className="cards">

          <div className="card">
            <h2>📝 Manage Content</h2>
            <p>
              Create and manage website content.
            </p>
          </div>

          <div className="card">
            <h2>✏️ Edit Articles</h2>
            <p>
              Update and edit published articles.
            </p>
          </div>

          <div className="card">
            <h2>📊 View Reports</h2>
            <p>
              View content analytics and reports.
            </p>
          </div>

        </div>

      </div>
    </>
  );
}

export default Editor;