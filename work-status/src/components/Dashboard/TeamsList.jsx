import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TeamsList.css";

function TeamList() {
  const [teams, setTeams] = useState([]);
  const [editingTeam, setEditingTeam] = useState(null);
  const [addingTeam, setAddingTeam] = useState(false);
  const [updatedTeam, setUpdatedTeam] = useState({
    id: "",
    teamName: "",
  });
  const [newTeam, setNewTeam] = useState({
    teamName: "",
  });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7112/api/Team/getall"
      );
      setTeams(response.data.data);
    } catch (error) {
      console.error("Takım verileri alınırken bir hata oluştu:", error);
    }
  };

  const handleEdit = (team) => {
    setEditingTeam(team.id);
    setUpdatedTeam({
      id: team.id,
      teamName: team.teamName,
    });
  };

  const handleUpdateChange = (event) => {
    const { name, value } = event.target;
    setUpdatedTeam((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put("https://localhost:7112/api/Team/update", updatedTeam);
      fetchTeams();
      setEditingTeam(null);
      alert("Team updated successfully!");
    } catch (error) {
      console.error("Takım güncellenirken bir hata oluştu:", error);
    }
  };

  const handleDelete = async (teamId) => {
    const confirmDelete = window.confirm(
      "Bu takımı silmek istediğinizden emin misiniz?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `https://localhost:7112/api/Team/delete?teamId=${teamId}`
        );
        fetchTeams();
        alert("Team başarıyla silindi!");
      } catch (error) {
        console.error("Takım silinirken bir hata oluştu:", error);
      }
    }
  };

  const handleAddToggle = () => {
    setAddingTeam(!addingTeam);
  };

  const handleAddChange = (event) => {
    const { name, value } = event.target;
    setNewTeam((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAdd = async () => {
    try {
      await axios.post("https://localhost:7112/api/Team/add", newTeam);
      fetchTeams();
      setAddingTeam(false);
      setNewTeam({ teamName: "" });
      alert("Team added successfully!");
    } catch (error) {
      console.error("Takım eklenirken bir hata oluştu:", error);
    }
  };

  return (
    <div className="team-list">
      <h2>Teams</h2>
      <button className="add-button" onClick={handleAddToggle}>
        {addingTeam ? "Cancel" : "Add New Team"}
      </button>
      {addingTeam && (
        <div className="add-form-container">
          <div className="add-form">
            <h3>Add New Team</h3>
            <input
              type="text"
              name="teamName"
              value={newTeam.teamName}
              onChange={handleAddChange}
              placeholder="Team Name"
            />
            <div className="form-actions">
              <button className="save-button" onClick={handleAdd}>
                Add
              </button>
              <button
                className="cancel-button"
                onClick={() => setAddingTeam(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="cards-container">
        {teams.map((team) => (
          <div key={team.id} className="card">
            <div className="card-header">
              <div className="card-title">{team.teamName}</div>
              <div className="icon-buttons">
                <button
                  className="icon-button"
                  onClick={() => handleEdit(team)}
                >
                  <i className="fa fa-edit"></i>
                </button>
                <button
                  className="icon-button"
                  onClick={() => handleDelete(team.id)}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            </div>
            <div className="card-content">
              {editingTeam === team.id && (
                <div className="update-form">
                  <h3>Update Team</h3>
                  <input
                    type="text"
                    name="teamName"
                    value={updatedTeam.teamName}
                    onChange={handleUpdateChange}
                    placeholder="Team Name"
                  />
                  <button className="save-button" onClick={handleUpdate}>
                    Save
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => setEditingTeam(null)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamList;
