import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ReportsList.css";

function ReportsList() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7112/api/Report/getreportdetails"
        );
        setReports(response.data.data);
      } catch (error) {
        console.error("Raporlar alınırken hata oluştu:", error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="reports-list">
      <h2>Reports</h2>
      {reports.length > 0 ? (
        <ul>
          {reports.map((report) => (
            <li key={report.id}>
              <p>
                <strong>Report Type:</strong> {report.reportType}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(report.reportDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Team:</strong> {report.teamName}
              </p>
              <p>
                <strong>Total Tasks Completed:</strong>{" "}
                {report.totalTasksCompleted}
              </p>
              <p>
                <strong>Total Tasks Pending:</strong> {report.totalTasksPending}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reports available</p>
      )}
    </div>
  );
}

export default ReportsList;
