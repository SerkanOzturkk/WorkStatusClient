import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeesList.css";

function EmployeesList() {
  const [employees, setEmployees] = useState([]);
  const [teams, setTeams] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [updatedEmployee, setUpdatedEmployee] = useState({
    id: "",
    employeeName: "",
    email: "",
    status: false,
    teamName: "",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7112/api/Employee/getemployeedetails"
        );
        setEmployees(response.data.data);
      } catch (error) {
        console.error("Çalışan verileri alınırken bir hata oluştu:", error);
      }
    };

    const fetchTeams = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7112/api/Team/getall"
        );
        setTeams(response.data.data);
      } catch (error) {
        console.error("Takım verileri alınırken bir hata oluştu:", error);
      }
    };

    fetchEmployees();
    fetchTeams();
  }, []);

  const handleEdit = (employee) => {
    setEditingEmployee(employee.id);
    setUpdatedEmployee({
      id: employee.id,
      employeeName: employee.employeeName,
      email: employee.email,
      status: employee.status,
      teamName: employee.teamName,
    });
  };

  const handleUpdateChange = (event) => {
    const { name, value } = event.target;
    setUpdatedEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const team = teams.find(
      (team) => team.teamName === updatedEmployee.teamName
    );
    if (!team) {
      alert("Selected team not found.");
      return;
    }
    try {
      await axios.put("https://localhost:7112/api/Employee/update", {
        ...updatedEmployee,
        teamId: team.id,
      });
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.id === updatedEmployee.id ? updatedEmployee : emp
        )
      );
      setEditingEmployee(null);
      alert("Employee updated successfully!");
    } catch (error) {
      console.error("Employee güncellenirken bir hata oluştu:", error);
    }
  };

  const handleDelete = async (employeeId) => {
    const confirmDelete = window.confirm(
      "Bu çalışanı silmek istediğinizden emin misiniz?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `https://localhost:7112/api/Employee/delete?employeeId=${employeeId}`
        );
        setEmployees((prevEmployees) =>
          prevEmployees.filter((emp) => emp.id !== employeeId)
        );
        alert("Çalışan başarıyla silindi!");
      } catch (error) {
        console.error("Çalışan silinirken bir hata oluştu:", error);
      }
    }
  };

  return (
    <div className="employees-list">
      <h2>Employees</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id} className="employee-item">
            <div className="employee-details">
              <div>
                <strong>Name:</strong> {employee.employeeName}
              </div>
              <div>
                <strong>Email:</strong> {employee.email}
              </div>
              <div>
                <strong>Status:</strong>{" "}
                {employee.status ? "Active" : "Inactive"}
              </div>
              <div>
                <strong>Team:</strong> {employee.teamName}
              </div>
            </div>
            <div className="icon-buttons">
              <button
                className="icon-button"
                onClick={() => handleEdit(employee)}
              >
                <i className="fa fa-edit"></i>
              </button>
              <button
                className="icon-button"
                onClick={() => handleDelete(employee.id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </div>
            {editingEmployee === employee.id && (
              <div className="update-form">
                <h3>Update Employee</h3>
                <input
                  type="text"
                  name="employeeName"
                  value={updatedEmployee.employeeName}
                  onChange={handleUpdateChange}
                  placeholder="Employee Name"
                />
                <input
                  type="email"
                  name="email"
                  value={updatedEmployee.email}
                  onChange={handleUpdateChange}
                  placeholder="Email"
                />
                <select
                  name="status"
                  value={updatedEmployee.status}
                  onChange={handleUpdateChange}
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </select>
                <select
                  name="teamName"
                  value={updatedEmployee.teamName}
                  onChange={handleUpdateChange}
                >
                  {teams.map((team) => (
                    <option key={team.id} value={team.teamName}>
                      {team.teamName}
                    </option>
                  ))}
                </select>
                <button className="save-button" onClick={handleUpdate}>
                  Save
                </button>
                <button
                  className="cancel-button"
                  onClick={() => setEditingEmployee(null)}
                >
                  Cancel
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeesList;
