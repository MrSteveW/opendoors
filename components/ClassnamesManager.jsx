import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import "../App.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function ClassnamesManager() {
  const { getToken } = useAuth();
  const [classnames, setClassnames] = useState([]);
  const [formData, setFormData] = useState({ classname: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all classnames on component mount
  useEffect(() => {
    fetchClassnames();
  }, []);

  // API Functions
  const fetchClassnames = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await fetch(`${API_URL}/class`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch classnames");

      const data = await response.json();
      setClassnames(data);
      setError("");
    } catch (err) {
      setError("Failed to load classnames: " + err.message);
      console.error("Error fetching classnames:", err);
    } finally {
      setLoading(false);
    }
  };

  const createClassname = async (classnameData) => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await fetch(`${API_URL}/class`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(classnameData),
      });

      if (!response.ok) throw new Error("Failed to create classname");

      const newClassname = await response.json();
      setClassnames([...classnames, newClassname]);
      setError("");
      return newClassname;
    } catch (err) {
      setError("Failed to create classname: " + err.message);
      console.error("Error creating classname:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateClassname = async (id, classnameData) => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await fetch(`${API_URL}/class/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(classnameData),
      });

      if (!response.ok) throw new Error("Failed to update classname");

      const updatedClassname = await response.json();
      setClassnames(
        classnames.map((item) => (item._id === id ? updatedClassname : item))
      );
      setError("");
      return updatedClassname;
    } catch (err) {
      setError("Failed to update classname: " + err.message);
      console.error("Error updating classname:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteClassname = async (id) => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await fetch(`${API_URL}/class/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete classname");

      setClassnames(classnames.filter((item) => item._id !== id));
      setError("");
    } catch (err) {
      setError("Failed to delete classname: " + err.message);
      console.error("Error deleting classname:", err);
    } finally {
      setLoading(false);
    }
  };

  // Form Handlers
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.classname.trim()) {
      setError("Class name is required");
      return;
    }

    try {
      if (isEditing) {
        await updateClassname(editingId, formData);
        setIsEditing(false);
        setEditingId(null);
      } else {
        await createClassname(formData);
      }

      // Reset form
      setFormData({ classname: "" });
    } catch (err) {}
  };

  const handleEdit = (classname) => {
    setFormData({ classname: classname.classname });
    setIsEditing(true);
    setEditingId(classname._id);
  };

  const handleCancelEdit = () => {
    setFormData({ classname: "" });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this class name?")) {
      await deleteClassname(id);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div className="admin-header">
        <h2 style={{ color: "#020265", fontSize: "2rem" }}>
          Class Names Manager
        </h2>
      </div>

      {/* Error Display */}
      {error && (
        <div
          style={{
            background: "#fee",
            color: "#c33",
            padding: "1rem",
            borderRadius: "4px",
            marginBottom: "1rem",
            border: "1px solid #fcc",
          }}
        >
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "3rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "end",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1", minWidth: "200px" }}>
            <input
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "1rem",
              }}
              name="classname"
              id="classname"
              type="text"
              placeholder="Enter class name"
              value={formData.classname}
              onChange={handleInputChange}
              required
            />
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "0.75rem 1.5rem",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "Saving..." : isEditing ? "Update" : "Add"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={handleCancelEdit}
                style={{
                  padding: "0.75rem 1.5rem",
                  fontSize: "1rem",
                  background: "#666",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Loading State */}
      {loading && !classnames.length && (
        <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
          Loading classnames...
        </div>
      )}

      {/* Classnames List */}
      <div>
        <h3
          style={{ color: "#020265", marginBottom: "1rem", fontSize: "1.5rem" }}
        >
          Current Class Names ({classnames.length})
        </h3>

        {classnames.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              color: "#666",
              background: "#f9f9f9",
              borderRadius: "4px",
            }}
          >
            No class names found. Add your first class name above!
          </div>
        ) : (
          <div
            style={{
              background: "white",
              borderRadius: "8px",
              border: "1px solid #ddd",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            {classnames.map((classname, index) => (
              <div
                key={classname._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1rem 1.5rem",
                  borderBottom:
                    index < classnames.length - 1 ? "1px solid #eee" : "none",
                }}
              >
                <div style={{ flex: 1 }}>
                  <h4
                    style={{
                      color: "#020265",
                      margin: "0",
                      fontSize: "1.1rem",
                      fontWeight: "500",
                    }}
                  >
                    {classname.classname}
                  </h4>
                  {classname.createdAt && (
                    <p
                      style={{
                        color: "#666",
                        fontSize: "0.8rem",
                        margin: "0.25rem 0 0 0",
                      }}
                    >
                      Created:{" "}
                      {new Date(classname.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div
                  style={{ display: "flex", gap: "0.5rem", marginLeft: "1rem" }}
                >
                  <button
                    onClick={() => handleEdit(classname)}
                    style={{
                      padding: "0.5rem 1rem",
                      fontSize: "0.9rem",
                      background: "#42a1ec",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(classname._id)}
                    style={{
                      padding: "0.5rem 1rem",
                      fontSize: "0.9rem",
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
