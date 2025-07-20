import React from "react";
import AddStudent from "./AddStudent";
import StudentList from "./StudentList";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Management</h1>
      <AddStudent />
      <StudentList />
    </div>
  );
}

export default App;