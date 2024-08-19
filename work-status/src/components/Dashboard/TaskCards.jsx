import React from "react";
import "./TaskCards.css";

const tasks = [
  { id: 1, title: "Project A", status: "In Progress" },
  { id: 2, title: "Project B", status: "Completed" },
  { id: 3, title: "Project C", status: "Not Started" },
];

function TaskCards() {
  return (
    <div className="task-cards">
      {tasks.map((task) => (
        <div key={task.id} className="task-card">
          <h3>{task.title}</h3>
          <p>Status: {task.status}</p>
        </div>
      ))}
    </div>
  );
}

export default TaskCards;
