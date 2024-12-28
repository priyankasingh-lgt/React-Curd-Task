import React from "react";

const Navbar = ({ filters, setFilters }) => {
  const handleFilterChange = (e, key) => {
    setFilters({ ...filters, [key]: e.target.value });
  };

  return (
    <div>
      <div className="navbar">
        <select
          value={filters.position}
          onChange={(e) => handleFilterChange(e, "position")}
          className="dropdown"
        >
          <option value="">Filter by Position</option>
          <option value="Developer">Developer</option>
          <option value="Tester">Tester</option>
          <option value="DevOps">DevOps</option>
          <option value="Manager">Manager</option>
          <option value="HR">HR</option>
        </select>
        
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange(e, "status")}
          className="dropdown"
        >
          <option value="">Filter by Status</option>
          <option value="Active">Active</option>
          <option value="On Leave">On Leave</option>
        </select>

        <select
          value={filters.company}
          onChange={(e) => handleFilterChange(e, "company")}
          className="dropdown"
        >
          <option value="">Filter by Company</option>
          <option value="Genamplify">Genamplify</option>
          <option value="Microsoft">Microsoft</option>
          <option value="Amazon">Amazon</option>
          <option value="Mavric">Mavric</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
