import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TeamsList.css";

function TeamsList() {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7112/api/Team/getall"
        );
        setTeams(response.data.data);
      } catch (error) {
        console.error("Ekip verileri alınırken bir hata oluştu:", error);
      }
    };

    fetchTeams();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredTeams = teams.filter((team) =>
    team.teamName.toLowerCase().includes(searchTerm)
  );

  const handleEdit = (teamId) => {
    console.log(`Edit team with ID: ${teamId}`);
    // Buraya düzenleme işlemleri eklenecek
  };

  const handleDelete = (teamId) => {
    console.log(`Delete team with ID: ${teamId}`);
    // Buraya silme işlemleri eklenecek
  };

  return (
    <div className="teams-list">
      <h2>Teams</h2>
      <input
        type="text"
        placeholder="Search teams..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <ul>
        {filteredTeams.length > 0 ? (
          filteredTeams.map((team) => (
            <li key={team.id} className="team-item">
              <span>{team.teamName}</span>
              <div className="icon-buttons">
                <button
                  className="icon-button"
                  onClick={() => handleEdit(team.id)}
                >
                  <i className="fa fa-edit"></i> {/* Edit icon */}
                </button>
                <button
                  className="icon-button"
                  onClick={() => handleDelete(team.id)}
                >
                  <i className="fa fa-trash"></i> {/* Delete icon */}
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="no-teams">No teams available</li>
        )}
      </ul>
    </div>
  );
}

export default TeamsList;
