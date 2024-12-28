import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeForm = ({ employeeId, setPage }) => {
  const [employee, setEmployee] = useState({
    name: "",
    empId: "",
    email: "",
    location: "",
    position: "",
    companyName: "",
    workStatus: "",
  });
 useEffect(() => {
    if (employeeId) {
      axios
        .get(`http://localhost:5000/dashboard/${employeeId}`)
        .then((res) => setEmployee(res.data))
        .catch((err) => console.error("Error fetching employee data:", err));
    }
  }, [employeeId]);
 const handleSubmit = (e) => {
    e.preventDefault();
    const endpoint = employeeId
      ? `http://localhost:5000/dashboard/${employeeId}`
      : `http://localhost:5000/dashboard`;

    const method = employeeId ? "put" : "post";
    axios[method](endpoint, employee)
      .then(() => {
        alert(
          employeeId ? "Employee updated successfully!" : "Employee added successfully!"
        );
        setPage("list");
      })
      .catch((err) => console.error("Error submitting form:", err));
  };
  return (
    <div className="employee-form">
      <h1>{employeeId ? "Edit Employee" : "Add Employee"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={employee.name}
          onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Employee ID"
          value={employee.empId}
          onChange={(e) => setEmployee({ ...employee, empId: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={employee.email}
          onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={employee.location}
          onChange={(e) =>
            setEmployee({ ...employee, location: e.target.value })
          }
          required
        />
        <select
          value={employee.position}
          onChange={(e) =>
            setEmployee({ ...employee, position: e.target.value })
          }
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
          value={employee.companyName}
          onChange={(e) =>
            setEmployee({ ...employee, companyName: e.target.value })
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
          value={employee.workStatus}
          onChange={(e) =>
            setEmployee({ ...employee, workStatus: e.target.value })
          }
          required
        >
          <option value="">Select Work Status</option>
          <option value="Active">Active</option>
          <option value="On Leave">On Leave</option>
        </select>
       <button type="submit">{employeeId ? "Update" : "Submit"}</button>
      </form>
      <button onClick={() => setPage("home")} className="back-btn">
        Back to Home
      </button>
    </div>
  );
};

export default EmployeeForm;
