import React, { useState } from "react";
import axios from "axios";

function AddStudent() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !age || isNaN(age) || parseInt(age) <= 0) {
      alert("Please enter a valid name and age.");
      return;
    }

    try {
      const response = await axios.post("http://AppTierLB-1707350793.ap-south-1.elb.amazonaws.com/add-student", {
        name,
        age: parseInt(age),
      });

      console.log("Server response:", response.data);
      alert("✅ Student added successfully!");

      setName("");
      setAge("");
    } catch (error) {
      console.error("❌ Error while adding student:", error);
      if (error.response) {
        alert(`Server Error: ${error.response.status} - ${error.response.data}`);
      } else {
        alert("Network Error: Unable to connect to backend.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Student</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
        required
        type="number"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddStudent;