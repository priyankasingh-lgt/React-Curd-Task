import React, { useState } from "react";
import Navbar from "./components/Navbar";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import EditEmployee from "./components/EditEmployee";
import "./App.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const [filters, setFilters] = useState({
    position: "",
    status: "",
    company: "",
  });

  const renderPage = () => {
    if (currentPage === "list") {
      return (
        <EmployeeList
          setPage={setCurrentPage}
          setEmployeeId={setSelectedEmployeeId}
          filters={filters}
        />
      );
    } else if (currentPage === "add") {
      return <EmployeeForm setPage={setCurrentPage} />;
    } else if (currentPage === "edit") {
      return (
        <EditEmployee
          setPage={setCurrentPage}
          employeeId={selectedEmployeeId}
        />
      );
    } else {
      return (
        <div className="home">
          <h1>Employee Dashboard</h1>
          <button onClick={() => setCurrentPage("list")}>Employee List</button>
          <button onClick={() => setCurrentPage("add")}>Add Employee</button>
        </div>
      );
    }
  };

  return (
    <div>
      <Navbar filters={filters} setFilters={setFilters} />
      {renderPage()}
    </div>
  );
};

export default App;
