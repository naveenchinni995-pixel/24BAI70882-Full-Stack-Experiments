import React, { useState } from "react";
import { authenticateUser } from "../services/authService";

function Login({ login }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const token = authenticateUser(username, password);

    if (token) {
      localStorage.setItem("token", token);
      login();
    } else {
      setError("Invalid Username or Password");
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h1>🔐 JWT Authentication</h1>

        <p>Please login to continue</p>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button onClick={handleLogin}>
          Login
        </button>

       <div className="demo-user">
  <h4>Demo Credentials</h4>

  <p><strong>Username:</strong> 24BAI70882</p>

  <p><strong>Password:</strong> Naveen@123</p>
</div>

      </div>

    </div>
  );
}

export default Login;