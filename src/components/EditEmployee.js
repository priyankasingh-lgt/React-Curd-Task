import React, { useState, useEffect } from "react";
import axios from "axios";

const EditEmployee = ({ setPage, employeeId }) => {
  const [formData, setFormData] = useState({
    name: "",
    empId: "",
    email: "",
    location: "",
    position: "",
    companyName: "",
    workStatus: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/dashboard/${employeeId}`).then((res) => {
      setFormData(res.data);
    });
  }, [employeeId]);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/dashboard/${employeeId}`, formData)
      .then(() => {
        alert("Employee updated successfully!");
        setPage("list");
      })
      .catch((err) => {
        console.error("Error updating employee:", err);
        alert("There was an error updating the employee!");
      });
  };
  return (
    <form onSubmit={handleSubmit} className="edit-employee-form">
      <h1>Edit Employee</h1>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Employee ID"
        value={formData.empId}
        onChange={(e) => setFormData({ ...formData, empId: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        required
      />

      <select
        value={formData.position}
        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
        required
      >
        <option value="">Select Position</option>
        <option value="Developer">Developer</option>
        <option value="Tester">Tester</option>
        <option value="DevOps">DevOps</option>
        <option value="Manager">Manager</option>
        <option value="HR">HR</option>
      </select>
      <select
        value={formData.companyName}
        onChange={(e) =>
          setFormData({ ...formData, companyName: e.target.value })
        }
        required
      >
        <option value="">Select Company</option>
        <option value="Genamplify">Genamplify</option>
        <option value="Amazon">Amazon</option>
        <option value="Microsoft">Microsoft</option>
        <option value="Mavric">Mavric</option>
      </select>
      <select
        value={formData.workStatus}
        onChange={(e) =>
          setFormData({ ...formData, workStatus: e.target.value })
        }
        required
      >
        <option value="">Select Work Status</option>
        <option value="Active">Active</option>
        <option value="On Leave">On Leave</option>
      </select>
      <button type="submit">Update</button>
      <button type="button" onClick={() => setPage("list")}>
        Cancel
      </button>
    </form>
  );
};

export default EditEmployee;
