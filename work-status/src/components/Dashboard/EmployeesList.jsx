import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeesList.css";

function EmployeesList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "https://localhost:7112/api/employee/getemployeedetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmployees(response.data.data);
      } catch (error) {
        console.error("Çalışan verileri alınırken hata oluştu:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="employees-list">
      {employees.length > 0 ? (
        employees.map((employee) => (
          <div key={employee.id} className="employee-item">
            <h3>{employee.employeeName}</h3>
            <p>Email: {employee.email}</p>
            <p>Team: {employee.teamName}</p>
            <p>Status: {employee.status ? "Active" : "Inactive"}</p>
          </div>
        ))
      ) : (
        <p>No employees available</p>
      )}
    </div>
  );
}

export default EmployeesList;
