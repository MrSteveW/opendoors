import React, { useState, useEffect } from "react";

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "",
    classname: "",
  });
  const API_URL = "http://localhost:3001/api/v1/users";

  // helper to get headers with token
  const authHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  // Fetch users from API (protected)
  const fetchUsers = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "GET",
        headers: authHeaders(),
      });

      if (res.status === 401) {
        console.error("Login required");
        return;
      }
      if (res.status === 403) {
        console.error("Invalid or expired token");
        return;
      }

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // Add new user
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(newUser),
      });
      if (res.ok) {
        setNewUser({ username: "", password: "", role: "", classname: "" });
        fetchUsers();
      } else {
        console.error("Failed to add user");
      }
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  // Update specific field
  const handleUpdateField = async (id, field, value) => {
    if (value === null) return; // user pressed cancel in prompt
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ [field]: value }),
      });
      if (res.ok) {
        fetchUsers();
      } else {
        console.error("Failed to update user");
      }
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (res.ok) {
        fetchUsers();
      } else {
        console.error("Failed to delete user");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User Manager</h1>

      {/* Add User Form */}
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Role (e.g. admin, user)"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Classname"
          value={newUser.classname}
          onChange={(e) =>
            setNewUser({ ...newUser, classname: e.target.value })
          }
        />
        <button type="submit">Add User</button>
      </form>

      {/* Users List */}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <div>
              <strong>{user.username}</strong> - {user.role} -{" "}
              {user.classname || "No class"}
            </div>
            <div>
              <button
                class="btn btn-light btn-sm edited"
                onClick={() =>
                  handleUpdateField(
                    user._id,
                    "username",
                    prompt("New username:", user.username)
                  )
                }
              >
                Edit Username
              </button>
              <button
                class="btn btn-light btn-sm edited"
                onClick={() =>
                  handleUpdateField(
                    user._id,
                    "password",
                    prompt("New password:")
                  )
                }
              >
                Edit Password
              </button>
              <button
                class="btn btn-light btn-sm edited"
                onClick={() =>
                  handleUpdateField(
                    user._id,
                    "role",
                    prompt("New role:", user.role)
                  )
                }
              >
                Edit Role
              </button>
              <button
                class="btn btn-light btn-sm edited"
                onClick={() =>
                  handleUpdateField(
                    user._id,
                    "classname",
                    prompt("New classname:", user.classname)
                  )
                }
              >
                Edit Classname
              </button>
              <button
                class="btn btn-light btn-sm edited"
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
