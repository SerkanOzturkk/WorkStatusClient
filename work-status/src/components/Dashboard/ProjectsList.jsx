import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProjectsList.css";

function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [addingProject, setAddingProject] = useState(false);
  const [updatedProject, setUpdatedProject] = useState({
    id: "",
    projectName: "",
    teamId: "",
  });
  const [newProject, setNewProject] = useState({
    projectName: "",
    teamId: "",
  });

  useEffect(() => {
    fetchProjects();
    fetchTeams(); // Takımların alınması
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7112/api/Project/getprojectdetails"
      );
      setProjects(response.data.data); // `teamName` bilgisi de burada gelmelidir
    } catch (error) {
      console.error("Projeler alınırken bir hata oluştu:", error);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7112/api/Team/getall"
      );
      setTeams(response.data.data);
    } catch (error) {
      console.error("Takımlar alınırken bir hata oluştu:", error);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project.id);
    setUpdatedProject({
      id: project.id,
      projectName: project.projectName,
      teamId: project.teamId,
    });
  };

  const handleUpdateChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        "https://localhost:7112/api/Project/update",
        updatedProject
      );
      fetchProjects(); // Listeleri güncelle
      setEditingProject(null);
      alert("Proje başarıyla güncellendi!");
    } catch (error) {
      console.error("Proje güncellenirken bir hata oluştu:", error);
    }
  };

  const handleDelete = async (projectId) => {
    const confirmDelete = window.confirm(
      "Bu projeyi silmek istediğinizden emin misiniz?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `https://localhost:7112/api/Project/delete?projectId=${projectId}`
        );
        fetchProjects(); // Listeleri güncelle
        alert("Proje başarıyla silindi!");
      } catch (error) {
        console.error("Proje silinirken bir hata oluştu:", error);
      }
    }
  };

  const handleAddToggle = () => {
    setAddingProject(!addingProject);
  };

  const handleAddChange = (event) => {
    const { name, value } = event.target;
    setNewProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAdd = async () => {
    try {
      await axios.post("https://localhost:7112/api/Project/add", newProject);
      fetchProjects(); // Listeleri güncelle
      setAddingProject(false);
      setNewProject({ projectName: "", teamId: "" });
      alert("Proje başarıyla eklendi!");
    } catch (error) {
      console.error("Proje eklenirken bir hata oluştu:", error);
    }
  };

  return (
    <div className="projects-list">
      <h2>Projects</h2>
      <button className="add-button" onClick={handleAddToggle}>
        {addingProject ? "Cancel" : "Add New Project"}
      </button>
      {addingProject && (
        <div className="add-form">
          <h3>Add New Project</h3>
          <input
            type="text"
            name="projectName"
            value={newProject.projectName}
            onChange={handleAddChange}
            placeholder="Project Name"
          />
          <select
            name="teamId"
            value={newProject.teamId}
            onChange={handleAddChange}
          >
            <option value="">Select Team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.teamName}
              </option>
            ))}
          </select>
          <button className="save-button" onClick={handleAdd}>
            Add
          </button>
        </div>
      )}
      <ul>
        {projects.map((project) => (
          <li key={project.id} className="project-item">
            <div className="project-details">
              <div>
                <strong>Project Name:</strong> {project.projectName}
              </div>
              <div>
                <strong>Team:</strong> {project.teamName || "N/A"}
              </div>
            </div>
            <div className="icon-buttons">
              <button
                className="icon-button"
                onClick={() => handleEdit(project)}
              >
                <i className="fa fa-edit"></i>
              </button>
              <button
                className="icon-button"
                onClick={() => handleDelete(project.id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </div>
            {editingProject === project.id && (
              <div className="update-form">
                <h3>Update Project</h3>
                <input
                  type="text"
                  name="projectName"
                  value={updatedProject.projectName}
                  onChange={handleUpdateChange}
                  placeholder="Project Name"
                />
                <select
                  name="teamId"
                  value={updatedProject.teamId}
                  onChange={handleUpdateChange}
                >
                  <option value="">Select Team</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.teamName}
                    </option>
                  ))}
                </select>
                <button className="save-button" onClick={handleUpdate}>
                  Save
                </button>
                <button
                  className="cancel-button"
                  onClick={() => setEditingProject(null)}
                >
                  Cancel
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectsList;
