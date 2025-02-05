// src/components/StudentsPage.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebaseConfig'; // Firestore instance from your config

const StudentsPage = () => {
  const [students, setStudents] = useState([]); // State to hold student data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state for handling issues

  // Fetching students data from Firestore
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsCollection = collection(db, 'students'); // Get the students collection
        const studentsSnapshot = await getDocs(studentsCollection); // Fetch the documents
        const studentsList = studentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Spread the student data
        }));
        setStudents(studentsList); // Set the students list in state
        setLoading(false); // Stop loading once the data is fetched
      } catch (err) {
        setError('Failed to load students data.'); // Handle errors
        setLoading(false);
      }
    };

    fetchStudents(); // Call the function to fetch data
  }, []);

  // Handle delete student
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'students', id)); // Delete the student by ID from Firestore
      setStudents(students.filter((student) => student.id !== id)); // Update state after deletion
    } catch (err) {
      setError('Failed to delete student.');
    }
  };

  return (
    <div>
      <h1>Students List</h1>

      {/* Loading and error handling */}
      {loading ? (
        <p></p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Class</th>
              <th>Section</th>
              <th>Roll Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{student.section}</td>
                <td>{student.rollNumber}</td>
                <td>
                  <button onClick={() => alert(`Viewing ${student.name}`)}>View</button>
                  <button onClick={() => alert(`Editing ${student.name}`)}>Edit</button>
                  <button onClick={() => handleDelete(student.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentsPage;

