import React, { useState, useEffect } from "react";
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
    statusId: "", // Status ID değiştirildi
    completionDate: null,
    managerApproval: false,
  });
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [statuses, setStatuses] = useState([]); // Statuses ekledik
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({
    id: "",
    taskName: "",
    projectId: "",
    assignedEmployeeId: "",
    statusId: "", // Status ID değiştirildi
    completionDate: null,
    managerApproval: false,
  });

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

    const fetchStatuses = async () => {
      // Statusları çekiyoruz
      try {
        const response = await axios.get(
          "https://localhost:7112/api/TaskStatus/gettaskstatus"
        );
        setStatuses(response.data.data);
      } catch (error) {
        console.error("Statusler alınırken hata oluştu:", error);
      }
    };

    fetchTasks();
    fetchProjects();
    fetchEmployees();
    fetchStatuses();
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
        (task) => task.statusName.toLowerCase() === selectedStatus.toLowerCase()
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
      [name]: name === "managerApproval" ? JSON.parse(value) : value,
    }));
  };

  const handleAdd = async () => {
    // Validasyon
    if (
      !newTask.taskName ||
      !newTask.projectId ||
      !newTask.assignedEmployeeId
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        "https://localhost:7112/api/Task/add",
        {
          TaskName: newTask.taskName,
          ProjectId: newTask.projectId,
          AssignedEmployeeId: newTask.assignedEmployeeId,
          TaskStatusId: 2, // "On Progress" için status ID'si (örneğin 2)
          completionDate: newTask.completionDate,
          managerApproval: newTask.managerApproval,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewTask({
        taskName: "",
        projectId: "",
        assignedEmployeeId: "",
        status: "On Progress", // Otomatik olarak ayarlanır, kullanıcıya gösterilmez
        completionDate: null,
        managerApproval: false,
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
      setSearchTerm("");
      setSelectedStatus("");
      alert("Görev başarıyla eklendi!");
    } catch (error) {
      console.error("Görev eklenirken bir hata oluştu:", error);
    }
  };

  const handleUpdate = (task) => {
    setEditingTask(task.id);
    setUpdatedTask({
      id: task.id,
      taskName: task.taskName,
      projectId: task.projectId,
      assignedEmployeeId: task.assignedEmployeeId,
      statusId: task.statusId, // Status ID değiştirildi
      completionDate: task.completionDate,
      managerApproval: task.managerApproval,
    });
  };

  const handleUpdateChange = (event) => {
    const { name, value } = event.target;
    setUpdatedTask((prevState) => {
      if (name === "managerApproval") {
        // Handle managerApproval change
        const newApproval = JSON.parse(value);
        const newStatusId = newApproval ? 9 : 8; // 9 for Approved, 8 for Rejected
        return {
          ...prevState,
          managerApproval: newApproval,
          status: newStatusId, // Set status based on approval
        };
      }
      return {
        ...prevState,
        [name]: name === "managerApproval" ? JSON.parse(value) : value,
      };
    });
  };

  const handleSaveUpdate = async () => {
    // Validasyon
    if (
      !updatedTask.taskName ||
      !updatedTask.projectId ||
      !updatedTask.assignedEmployeeId
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      // Eğer managerApproval true ise TaskStatusId 9 (Approved), false ise TaskStatusId 8 (Rejected)
      const updatedTaskWithStatus = {
        ...updatedTask,
        TaskStatusId: updatedTask.managerApproval ? 9 : 8,
      };

      await axios.put(
        "https://localhost:7112/api/Task/update",
        updatedTaskWithStatus,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Görevler listesini güncelle
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

      setEditingTask(null);
      alert("Görev başarıyla güncellendi!");
    } catch (error) {
      console.error("Görev güncellenirken bir hata oluştu:", error);
    }
  };

  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm(
      "Bu görevi silmek istediğinizden emin misiniz?"
    );
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.delete(
          `https://localhost:7112/api/Task/delete?taskId=${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        alert("Görev başarıyla silindi!");
      } catch (error) {
        console.error("Görev silinirken bir hata oluştu:", error);
      }
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
            <div className="form-actions">
              <button className="save-button" onClick={handleAdd}>
                Add
              </button>
              <button className="cancel-button" onClick={handleAddToggle}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="filter-container">
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
            {statuses.map((status) => (
              <option key={status.id} value={status.statusName}>
                {status.statusName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="cards-container">
        {filteredTasks.map((task) => {
          // Statüye göre CSS sınıfını belirle
          const statusClass = `status-${task.statusName
            .toLowerCase()
            .replace(/ /g, "-")}`;

          return (
            <div key={task.id} className="card">
              <div className="card-header">
                <div className="card-title">{task.taskName}</div>
                <div className="icon-buttons">
                  <button
                    className="icon-button"
                    onClick={() => handleUpdate(task)}
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                  <button
                    className="icon-button"
                    onClick={() => handleDelete(task.id)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              </div>
              <div className="card-content">
                <div>
                  <strong>Project:</strong> {task.projectName || "Not set"}
                </div>
                <div>
                  <strong>Assigned Employee:</strong>{" "}
                  {task.assignedEmployeeName || "Not set"}
                </div>
                <div>
                  <strong>Completion Date:</strong>{" "}
                  {task.completionDate
                    ? new Date(task.completionDate).toLocaleDateString()
                    : "Not completed yet"}
                </div>
                <div>
                  <strong>Status:</strong>{" "}
                  <span className={statusClass}>
                    {task.statusName || "Not set"}
                  </span>
                </div>
                {editingTask === task.id && (
                  <div className="update-form-wrapper">
                    <div className="update-form">
                      <h3>Update Task</h3>
                      <input
                        type="text"
                        name="taskName"
                        value={updatedTask.taskName}
                        onChange={handleUpdateChange}
                        placeholder="Task Name"
                      />
                      <select
                        name="projectId"
                        value={updatedTask.projectId}
                        onChange={handleUpdateChange}
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
                        value={updatedTask.assignedEmployeeId}
                        onChange={handleUpdateChange}
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
                        value={updatedTask.status}
                        onChange={handleUpdateChange}
                      >
                        <option value="">Select Status</option>
                        {statuses.map((status) => (
                          <option key={status.id} value={status.id}>
                            {status.statusName}
                          </option>
                        ))}
                      </select>

                      <select
                        name="managerApproval"
                        value={updatedTask.managerApproval}
                        onChange={handleUpdateChange}
                      >
                        <option value={true}>Approve</option>
                        <option value={false}>Reject</option>
                      </select>
                      <div className="form-actions">
                        <button
                          className="save-button"
                          onClick={handleSaveUpdate}
                        >
                          Save
                        </button>
                        <button
                          className="cancel-button"
                          onClick={() => setEditingTask(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TasksList;
