import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeList = ({ setPage, setEmployeeId, filters }) => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5); 

  useEffect(() => {
    axios
      .get("http://localhost:5000/dashboard")
      .then((res) => {
        setEmployees(res.data);
        setFilteredEmployees(res.data);
      })
      .catch((err) => {
        console.error("Error fetching employees:", err);
      });
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let result = employees;

      if (filters.position) {
        result = result.filter((emp) => emp.position === filters.position);
      }

      if (filters.status) {
        result = result.filter((emp) => emp.workstatus === filters.status);
      }

      if (filters.company) {
        result = result.filter((emp) => emp.companyname === filters.company);
      }

      setFilteredEmployees(result);
    };

    applyFilters();
  }, [filters, employees]);

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
  


  const handleDelete = (empId) => {
    axios
      .delete(`http://localhost:5000/dashboard/${empId}`)
      .then(() => {
        setEmployees(employees.filter((emp) => emp.empid !== empId));
      })
      .catch((err) => {
        console.error("Error deleting employee:", err);
      });
  };

  
  const handlePageChange = (event) => {
    setCurrentPage(Number(event.target.value));
  };

  return (
    <div className="employee-list">
      <h1>Employee List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>EmpId</th>
            <th>Email</th>
            <th>Location</th>
            <th>Position</th>
            <th>Company</th>
            <th>Work Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.length > 0 ? (
            currentEmployees.map((emp) => (
              <tr key={emp.empid}>
                <td>{emp.name}</td>
                <td>{emp.empid}</td>
                <td>{emp.email}</td>
                <td>{emp.location}</td>
                <td>{emp.position}</td>
                <td>{emp.companyname}</td>
                <td>{emp.workstatus}</td>
                <td>
                  <button
                    onClick={() => {
                      setEmployeeId(emp.empid);
                      setPage("edit");
                    }}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(emp.empid)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      <div className="pagination">
        <label htmlFor="page-select">Select Page: </label>
        <select
          id="page-select"
          value={currentPage}
          onChange={handlePageChange}
        >
          {Array.from({ length: totalPages }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>

      <button onClick={() => setPage("home")} className="back-btn">
        Back to Home
      </button>
    </div>
  );
};

export default EmployeeList;
