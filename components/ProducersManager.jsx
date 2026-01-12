import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import "../App.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProducersManager() {
  const { getToken } = useAuth();
  const [producers, setProducers] = useState([]);
  const [formData, setFormData] = useState({ producer: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all producers on component mount
  useEffect(() => {
    fetchProducers();
  }, []);

  // API Functions
  const fetchProducers = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await fetch(`${API_URL}/producers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch producers");
      const data = await response.json();
      setProducers(data);
      setError("");
    } catch (err) {
      setError("Failed to load producers: " + err.message);
      console.error("Error fetching producers:", err);
    } finally {
      setLoading(false);
    }
  };

  const createProducer = async (producerData) => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await fetch(`${API_URL}/producers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(producerData),
      });

      if (!response.ok) throw new Error("Failed to create producer");

      const newProducer = await response.json();
      setProducers([...producers, newProducer]);
      setError("");
      return newProducer;
    } catch (err) {
      setError("Failed to create producer: " + err.message);
      console.error("Error creating producer:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProducer = async (id, producerData) => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await fetch(`${API_URL}/producers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(producerData),
      });

      if (!response.ok) throw new Error("Failed to update producer");

      const updatedProducer = await response.json();
      setProducers(
        producers.map((item) => (item._id === id ? updatedProducer : item))
      );
      setError("");
      return updatedProducer;
    } catch (err) {
      setError("Failed to update producer: " + err.message);
      console.error("Error updating producer:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProducer = async (id) => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await fetch(`${API_URL}/producers/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete producer");

      setProducers(producers.filter((item) => item._id !== id));
      setError("");
    } catch (err) {
      setError("Failed to delete producer: " + err.message);
      console.error("Error deleting producer:", err);
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

    if (!formData.producer.trim()) {
      setError("Producer name is required");
      return;
    }

    try {
      if (isEditing) {
        await updateProducer(editingId, formData);
        setIsEditing(false);
        setEditingId(null);
      } else {
        await createProducer(formData);
      }

      // Reset form
      setFormData({ producer: "" });
    } catch (err) {}
  };

  const handleEdit = (producer) => {
    setFormData({ producer: producer.producer });
    setIsEditing(true);
    setEditingId(producer._id);
  };

  const handleCancelEdit = () => {
    setFormData({ producer: "" });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this producer?")) {
      await deleteProducer(id);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div className="admin-header">
        <h2
          style={{ color: "#020265", marginBottom: "2rem", fontSize: "2rem" }}
        >
          Producers Manager
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
            <label
              style={{
                display: "block",
                color: "#020265",
                fontSize: "0.9rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
              htmlFor="producer"
            >
              Producer Name
            </label>
            <input
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "1rem",
              }}
              name="producer"
              id="producer"
              type="text"
              placeholder="Enter producer name"
              value={formData.producer}
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
      {loading && !producers.length && (
        <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
          Loading producers...
        </div>
      )}

      {/* Producers List */}
      <div>
        <h3
          style={{ color: "#020265", marginBottom: "1rem", fontSize: "1.5rem" }}
        >
          Current Producers ({producers.length})
        </h3>

        {producers.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              color: "#666",
              background: "#f9f9f9",
              borderRadius: "4px",
            }}
          >
            No producers found. Add your first producer above!
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
            {producers.map((producer, index) => (
              <div
                key={producer._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "1rem 1.5rem",
                  borderBottom:
                    index < producers.length - 1 ? "1px solid #eee" : "none",
                }}
              >
                <div style={{ flex: 1 }}>
                  <h4
                    style={{
                      color: "#020265",
                      margin: "0 0 0.25rem 0",
                      fontSize: "1.1rem",
                    }}
                  >
                    {producer.producer || producer.name || "No Name"}
                  </h4>
                  {producer.createdAt && (
                    <p
                      style={{
                        color: "#666",
                        fontSize: "0.8rem",
                        margin: 0,
                      }}
                    >
                      Created:{" "}
                      {new Date(producer.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => handleEdit(producer)}
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
                    onClick={() => handleDelete(producer._id)}
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
