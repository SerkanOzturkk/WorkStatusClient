import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TasksList.css";

function TasksList() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [addingTask, setAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({
    taskName: "",
    projectId: "",
    assignedEmployeeId: "",
    status: "",
  });
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

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
        setFilteredTasks(response.data.data);
      } catch (error) {
        console.error("Görevler alınırken hata oluştu:", error);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7112/api/Project/getprojectdetails"
        );
        setProjects(response.data.data);
      } catch (error) {
        console.error("Projeler alınırken hata oluştu:", error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7112/api/Employee/getemployeedetails"
        );
        setEmployees(response.data.data);
      } catch (error) {
        console.error("Çalışanlar alınırken hata oluştu:", error);
      }
    };

    fetchTasks();
    fetchProjects();
    fetchEmployees();
  }, []);

  useEffect(() => {
    let results = tasks;

    if (searchTerm) {
      results = results.filter((task) =>
        task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedStatus) {
      results = results.filter(
        (task) => task.status.toLowerCase() === selectedStatus.toLowerCase()
      );
    }

    setFilteredTasks(results);
  }, [searchTerm, selectedStatus, tasks]);

  const handleAddToggle = () => {
    setAddingTask(!addingTask);
  };

  const handleAddChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post("https://localhost:7112/api/Task/add", newTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewTask({
        taskName: "",
        projectId: "",
        assignedEmployeeId: "",
        status: "",
      });
      setAddingTask(false);
      const response = await axios.get(
        "https://localhost:7112/api/Task/gettaskdetails",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(response.data.data);
      setSearchTerm(""); // Arama terimini temizle
      setSelectedStatus(""); // Seçilen durumu temizle
      alert("Görev başarıyla eklendi!");
    } catch (error) {
      console.error("Görev eklenirken bir hata oluştu:", error);
    }
  };

  return (
    <div className="tasks-list">
      <h2>Tasks</h2>
      <button className="add-button" onClick={handleAddToggle}>
        {addingTask ? "Cancel" : "Add New Task"}
      </button>
      {addingTask && (
        <div className="add-form-wrapper">
          <div className="add-form">
            <h3>Add New Task</h3>
            <input
              type="text"
              name="taskName"
              value={newTask.taskName}
              onChange={handleAddChange}
              placeholder="Task Name"
            />
            <select
              name="projectId"
              value={newTask.projectId}
              onChange={handleAddChange}
            >
              <option value="">Select Project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.projectName}
                </option>
              ))}
            </select>
            <select
              name="assignedEmployeeId"
              value={newTask.assignedEmployeeId}
              onChange={handleAddChange}
            >
              <option value="">Select Employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.employeeName}
                </option>
              ))}
            </select>
            <select
              name="status"
              value={newTask.status}
              onChange={handleAddChange}
            >
              <option value="">Select Status</option>
              <option value="On Process">On Process</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
            <button className="save-button" onClick={handleAdd}>
              Add
            </button>
            <button className="cancel-button" onClick={handleAddToggle}>
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="status-filter">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="On Process">On Process</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
      {filteredTasks.length === 0 ? (
        <div className="no-tasks">No tasks available</div>
      ) : (
        filteredTasks.map((task) => (
          <div key={task.id} className="task-item">
            <h3 className="task-name">{task.taskName}</h3>
            <p>Project: {task.projectName}</p>
            <p>Assigned Employee: {task.employeeName}</p>
            <p>Status: {task.status}</p>
            <p>Completion Date: {task.completionDate}</p>
            <p>Manager Approval: {task.managerApproval}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default TasksList;
