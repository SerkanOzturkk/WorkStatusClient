import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import "./Calendar.css"; // CSS dosyanızı import edin
import "react-calendar/dist/Calendar.css";
import { getUserNameAndIdFromToken } from "./Auth.jsx"; // Güncellenmiş fonksiyonu import edin

const Form = ({ selectedDate, onClose, employeeName, taskNames }) => {
  const [taskName, setTaskName] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [overtimeHours, setOvertimeHours] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    console.log("Task Names in Form:", taskNames); // Task listelerini kontrol edin
  }, [taskNames]);

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    if (name === "taskName") {
      setTaskName(value);
      const task = taskNames.find((task) => task.taskName === value);
      if (task) setSelectedTaskId(task.id);
    }
    if (name === "hoursWorked") setHoursWorked(value);
    if (name === "overtimeHours") setOvertimeHours(value);
  };

  const handleSubmit = () => {
    // Validation
    if (!taskName || !hoursWorked || !overtimeHours) {
      alert("Please fill in all the required fields.");
      return;
    }

    if (isNaN(hoursWorked) || isNaN(overtimeHours)) {
      alert("Please enter valid numbers for hours worked and overtime hours.");
      return;
    }

    const token = localStorage.getItem("authToken");
    const { id: employeeId } = getUserNameAndIdFromToken(token);

    // Formatlı tarihi yerel saat dilimine göre al
    const formattedDate = selectedDate.toLocaleDateString("en-CA"); // YYYY-MM-DD formatı için

    axios
      .post("https://localhost:7112/api/TimeLog/add", {
        EmployeeId: employeeId,
        TaskId: selectedTaskId,
        Date: formattedDate,
        HoursWorked: hoursWorked,
        OvertimeHours: overtimeHours,
      })
      .then((response) => {
        console.log("TimeLog successfully added:", response.data);
        alert("Time log successfully added."); // Başarı mesajı
        onClose();
      })
      .catch((error) => {
        console.error("Error adding TimeLog:", error);
        alert("There was an error adding the time log. Please try again."); // Hata mesajı
      });
  };

  return (
    <div className="add-form-wrapper">
      <div className="add-form">
        <h3>Work Log for {selectedDate.toDateString()}</h3>
        <input
          type="text"
          name="employeeName"
          value={employeeName}
          readOnly
          placeholder="Employee Name"
        />
        <select name="taskName" value={taskName} onChange={handleAddChange}>
          <option value="" disabled>
            Select Task
          </option>
          {taskNames.length > 0 ? (
            taskNames.map((task) => (
              <option key={task.id} value={task.taskName}>
                {task.taskName}
              </option>
            ))
          ) : (
            <option>No tasks available</option>
          )}
        </select>
        <input
          type="number"
          name="hoursWorked"
          value={hoursWorked}
          onChange={handleAddChange}
          placeholder="Hours Worked"
        />
        <input
          type="number"
          name="overtimeHours"
          value={overtimeHours}
          onChange={handleAddChange}
          placeholder="Overtime Hours"
        />
        <div className="form-actions">
          <button className="form-button save-button" onClick={handleSubmit}>
            Save
          </button>
          <button className="form-button cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

function MyApp() {
  const [value, onChange] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [employeeName, setEmployeeName] = useState("");
  const [taskNames, setTaskNames] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const { name, id } = getUserNameAndIdFromToken(token);
    setEmployeeName(name);
    setEmployeeId(id);
  }, []);

  useEffect(() => {
    if (employeeId) {
      axios
        .get(
          `https://localhost:7112/api/Task/getbyassignedemployeeid?assignedEmployeeId=${employeeId}`
        )
        .then((response) => {
          console.log("API Response Data:", response.data.data); // API yanıtının data kısmını kontrol edin
          const filteredTasks = response.data.data.filter(
            (task) => task.status === "On Process"
          );
          console.log("Filtered Tasks:", filteredTasks); // Filtrelenmiş görevleri kontrol edin
          setTaskNames(filteredTasks);
        })
        .catch((error) => {
          console.error("Error fetching tasks:", error);
        });
    }
  }, [employeeId]);

  const handleTileClick = (date) => {
    if (date <= new Date()) {
      setSelectedDate(date);
      setShowForm(true);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedDate(null);
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const day = date.getDay();
      if (day === 6) return "saturday";
      if (day === 0) return "sunday";
    }
    return null;
  };

  return (
    <div>
      <div className="calendar-container">
        {showForm && (
          <Form
            selectedDate={selectedDate}
            onClose={handleCloseForm}
            employeeName={employeeName}
            taskNames={taskNames}
          />
        )}
        <Calendar
          className="custom-calendar"
          onChange={onChange}
          value={value}
          tileClassName={tileClassName}
          onClickDay={handleTileClick}
        />
      </div>
    </div>
  );
}

export default MyApp;
