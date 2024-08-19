import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TasksList.css";

function TasksList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "https://localhost:7112/api/Task/gettaskdetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTasks(response.data.data);
      } catch (error) {
        console.error("Görevler alınırken hata oluştu:", error);
      }
    };

    fetchTasks();
  }, []);

  if (tasks.length === 0) {
    return <div className="no-tasks">No tasks available</div>;
  }

  return (
    <div className="tasks-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <h3>{task.taskName}</h3>
          <p>Project: {task.projectName}</p>
          <p>Assigned to: {task.assignedEmployeeName}</p>
          <p>Status: {task.status}</p>
        </div>
      ))}
    </div>
  );
}

export default TasksList;
