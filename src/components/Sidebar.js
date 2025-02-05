// src/components/Sidebar.js
import React from "react";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="sidebar">
      <button onClick={() => navigate("/students")}>Students Page</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Sidebar;
