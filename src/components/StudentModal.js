// src/components/StudentModal.js
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

const StudentModal = ({ closeModal }) => {
  const [studentData, setStudentData] = useState({
    name: "",
    class: "",
    section: "",
    rollNumber: "",
    // Add more fields here as required
  });

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await addDoc(collection(db, "students"), studentData);
    closeModal();
  };

  return (
    <div className="modal">
      <h2>Add Student</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />
      <input
        type="text"
        name="class"
        placeholder="Class"
        onChange={handleChange}
      />
      <input
        type="text"
        name="section"
        placeholder="Section"
        onChange={handleChange}
      />
      <input
        type="text"
        name="rollNumber"
        placeholder="Roll Number"
        onChange={handleChange}
      />
      {/* Add more fields here */}
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={closeModal}>Cancel</button>
    </div>
  );
};

export default StudentModal;
