import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("http://<YOUR-ALB-URL>/students").then((res) => {
      setStudents(res.data);
    });
  }, []);

  return (
    <div>
      <h3>All Students</h3>
      <ul>
        {students.map((student) => (
          <li key={student.id}>{student.name} (Age: {student.age})</li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;