import React, { useState, useEffect } from "react";

export default function PupilManager() {
  const [pupils, setPupils] = useState([]);
  const [newPupil, setNewPupil] = useState({ name: "", class: "", year: "" });
  const API_URL = "http://localhost:3001/api/v1/pupils";

  // Fetch pupils from API
  const fetchPupils = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPupils(data);
    } catch (err) {
      console.error("Error fetching pupils:", err);
    }
  };

  useEffect(() => {
    fetchPupils();
  }, []);

  // Add new pupil
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPupil),
      });
      if (res.ok) {
        setNewPupil({ name: "", class: "", year: "" });
        fetchPupils();
      }
    } catch (err) {
      console.error("Error adding pupil:", err);
    }
  };

  // Update specific field
  const handleUpdateField = async (id, field, value) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      if (res.ok) {
        fetchPupils();
      }
    } catch (err) {
      console.error("Error updating pupil:", err);
    }
  };

  // Delete pupil
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchPupils();
      }
    } catch (err) {
      console.error("Error deleting pupil:", err);
    }
  };

  return (
    <div>
      <h1>Pupil Manager</h1>

      {/* Add Pupil Form */}
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Name"
          value={newPupil.name}
          onChange={(e) => setNewPupil({ ...newPupil, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Class"
          value={newPupil.class}
          onChange={(e) => setNewPupil({ ...newPupil, class: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Year"
          value={newPupil.year}
          onChange={(e) => setNewPupil({ ...newPupil, year: e.target.value })}
          required
        />
        <button type="submit">Add Pupil</button>
      </form>

      {/* Pupils List */}
      <ul>
        {pupils.map((pupil) => (
          <li key={pupil._id}>
            <div>
              <strong>{pupil.name}</strong> - {pupil.class} - {pupil.year}
            </div>
            <div>
              <button
                onClick={() =>
                  handleUpdateField(
                    pupil._id,
                    "name",
                    prompt("New name:", pupil.name)
                  )
                }
              >
                Edit Name
              </button>
              <button
                onClick={() =>
                  handleUpdateField(
                    pupil._id,
                    "class",
                    prompt("New class:", pupil.class)
                  )
                }
              >
                Edit Class
              </button>
              <button
                onClick={() =>
                  handleUpdateField(
                    pupil._id,
                    "year",
                    prompt("New year:", pupil.year)
                  )
                }
              >
                Edit Year
              </button>
              <button onClick={() => handleDelete(pupil._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
