import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const token = authenticateUser(username, password);

    if (!token) {
      setError("Invalid Username or Password");
      return;
    }

    localStorage.setItem("token", token);

    const payload = JSON.parse(
      atob(token.split(".")[1])
    );

    if (payload.role === "Admin") {
      navigate("/admin");
    } else if (payload.role === "Editor") {
      navigate("/editor");
    } else {
      navigate("/viewer");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h1>🔐 Role Based Access Control</h1>

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
          <h3>Demo Credentials</h3>

          <p><strong>Admin:</strong> admin / admin123</p>

          <p><strong>Editor:</strong> editor / editor123</p>

          <p><strong>Viewer:</strong> viewer / viewer123</p>

        </div>

      </div>
    </div>
  );
}

export default Login;