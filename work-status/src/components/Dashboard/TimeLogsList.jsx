import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TimeLogsList.css";

function TimeLogsList() {
  const [timeLogs, setTimeLogs] = useState([]);

  useEffect(() => {
    const fetchTimeLogs = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7112/api/TimeLog/gettimelogdetails"
        );
        setTimeLogs(response.data.data);
      } catch (error) {
        console.error("Time logs alınırken hata oluştu:", error);
      }
    };

    fetchTimeLogs();
  }, []);

  return (
    <div className="time-logs-list">
      <h2>Time Logs</h2>
      {timeLogs.length > 0 ? (
        <ul>
          {timeLogs.map((log) => (
            <li key={log.id}>
              <p>
                <strong>Employee:</strong> {log.employeeName}
              </p>
              <p>
                <strong>Task:</strong> {log.taskName}
              </p>
              <p>
                <strong>Date:</strong> {new Date(log.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Hours Worked:</strong> {log.hoursWorked}
              </p>
              <p>
                <strong>Overtime Hours:</strong> {log.overtimeHours}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No time logs available</p>
      )}
    </div>
  );
}

export default TimeLogsList;
