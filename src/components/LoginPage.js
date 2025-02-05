// src/components/LoginPage.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState(""); // Holds email input
  const [password, setPassword] = useState(""); // Holds password input
  const [error, setError] = useState(""); // To display error messages if login fails
  const navigate = useNavigate(); // To navigate to the next page

  // Function to handle login logic
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError(""); // Reset error message

    try {
      // Firebase authentication with email and password
      await signInWithEmailAndPassword(email, password);
      navigate("/StudentsPage"); // Redirect to the Students Page upon successful login
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      navigate("/Students"); // Set error if login fails
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state on change
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state on change
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* Show error if exists */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
