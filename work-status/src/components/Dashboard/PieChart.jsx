import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";

export default function TaskStatusPieChart() {
  const [taskData, setTaskData] = useState([]);

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
        const statusCounts = tasks.reduce((acc, task) => {
          acc[task.status] = (acc[task.status] || 0) + 1;
          return acc;
        }, {});

        // PieChart için uygun formata dönüştürme
        const pieData = Object.keys(statusCounts).map((status) => ({
          id: status,
          value: statusCounts[status],
          label: status,
        }));

        setTaskData(pieData);
      } catch (error) {
        console.error("Veri yüklenirken hata oluştu:", error);
      }
    };

    fetchTaskData();
  }, []);

  return (
    <PieChart
      series={[
        {
          data: taskData,
        },
      ]}
      width={400}
      height={200}
    />
  );
}
