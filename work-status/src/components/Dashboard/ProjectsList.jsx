import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProjectsList.css";

function ProjectsList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7112/api/project/getprojectdetails"
        );
        if (response.data.success) {
          setProjects(response.data.data); // Veriyi state'e kaydediyoruz
        } else {
          console.error("API başarısız:", response.data.message);
        }
      } catch (error) {
        console.error("Projeler alınırken hata oluştu:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="projects-list">
      <h2>Projects</h2>
      <ul>
        {projects.length > 0 ? (
          projects.map((project) => (
            <li key={project.id}>
              {project.projectName} - {project.teamName}
            </li>
          ))
        ) : (
          <li>No projects available</li>
        )}
      </ul>
    </div>
  );
}

export default ProjectsList;
