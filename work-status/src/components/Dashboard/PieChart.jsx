import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";

export default function TaskStatusPieChart() {
  const [taskData, setTaskData] = useState([]);
  const [statusCounts, setStatusCounts] = useState({});

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await fetch(
          "https://localhost:7112/api/Task/gettaskdetails"
        );
        const result = await response.json();

        // API'den gelen veriler
        const tasks = result.data;

        // Status'lara göre gruplama yap
        const counts = tasks.reduce((acc, task) => {
          const statusName = task.statusName; // Status adı al
          acc[statusName] = (acc[statusName] || 0) + 1;
          return acc;
        }, {});

        // PieChart için uygun formata dönüştürme
        const pieData = Object.keys(counts).map((status) => ({
          id: status,
          value: counts[status],
          label: status,
        }));

        setTaskData(pieData);
        setStatusCounts(counts);
      } catch (error) {
        console.error("Veri yüklenirken hata oluştu:", error);
      }
    };

    fetchTaskData();
  }, []);

  return (
    <div style={{ textAlign: "center", paddingLeft: "40px" }}>
      <h2 style={{ margin: "0", paddingBottom: "16px", paddingRight: "64px" }}>
        Task Status
      </h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <PieChart
          series={[
            {
              data: taskData,
            },
          ]}
          width={400}
          height={200}
        />
      </div>
      <div
        style={{
          marginTop: "20px",
          fontSize: "16px",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {Object.keys(statusCounts).map((status) => (
          <p key={status}>
            <strong>{status}:</strong> {statusCounts[status]}
          </p>
        ))}
      </div>
    </div>
  );
}
