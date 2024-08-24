import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "./Calendar.css"; // CSS dosyanızı import edin
import "react-calendar/dist/Calendar.css";
import { getUserNameFromToken } from "./Auth"; // Auth fonksiyonunuzu import edin

// Form bileşeni
const Form = ({ selectedDate, onClose, employeeName }) => {
  const [task, setTask] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [overtimeHours, setOvertimeHours] = useState("");

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    if (name === "task") setTask(value);
    if (name === "hoursWorked") setHoursWorked(value);
    if (name === "overtimeHours") setOvertimeHours(value);
  };

  const handleSubmit = () => {
    // Form verilerini işleme (örneğin, API'ye gönderme)
    console.log({
      employeeName,
      task,
      date: selectedDate,
      hoursWorked,
      overtimeHours,
    });
    onClose(); // Formu kapat
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
        <input
          type="text"
          name="task"
          value={task}
          onChange={handleAddChange}
          placeholder="Task"
        />
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

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const name = getUserNameFromToken(token);
    setEmployeeName(name);
  }, []);

  // Herhangi bir güne tıklama olayını işleme
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

  // Cumartesi ve Pazar günlerini işaretlemek için sınıf ekleme fonksiyonu
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const day = date.getDay();
      if (day === 6) return "saturday"; // Cumartesi
      if (day === 0) return "sunday"; // Pazar
    }
    return null;
  };

  return (
    <div className="calendar-container">
      {showForm && (
        <Form
          selectedDate={selectedDate}
          onClose={handleCloseForm}
          employeeName={employeeName}
        />
      )}
      <Calendar
        className="custom-calendar"
        onChange={onChange}
        value={value}
        tileClassName={tileClassName} // Özel sınıf ekleme
        onClickDay={handleTileClick} // Tıklama olayını işleme
      />
    </div>
  );
}

export default MyApp;
