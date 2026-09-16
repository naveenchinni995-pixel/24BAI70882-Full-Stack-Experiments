import React from "react";
import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="unauthorized">

      <h1>🚫 403</h1>

      <h2>Access Denied</h2>

      <p>
        Sorry! You don't have permission to access this page.
      </p>

      <Link to="/">
        <button className="back-btn">
          Back to Login
        </button>
      </Link>

    </div>
  );
}

export default Unauthorized;