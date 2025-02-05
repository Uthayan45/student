// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import StudentsPage from "./components/StudentsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />{" "}
        {/* Login page as the default */}
        <Route path="/students" element={<StudentsPage />} />{" "}
        {/* Students page */}
      </Routes>
    </Router>
  );
}

export default App;
