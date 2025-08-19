import React, { useState } from "react";
import BookingManager from "./BookingManager";
import PupilManager from "./PupilManager";
import UserManager from "./UserManager";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("bookings");

  const renderContent = () => {
    switch (activeSection) {
      case "bookings":
        return <BookingManager />;
      case "pupils":
        return <PupilManager />;
      case "users":
        return <UserManager />;
      default:
        return <p>Select a section from the sidebar</p>;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "200px",
          background: "#2c3e50",
          color: "#ecf0f1",
          padding: "20px",
        }}
      >
        <h2>Admin</h2>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li
              style={{
                padding: "10px",
                cursor: "pointer",
                background: activeSection === "bookings" ? "#34495e" : "none",
              }}
              onClick={() => setActiveSection("bookings")}
            >
              Bookings
            </li>
            <li
              style={{
                padding: "10px",
                cursor: "pointer",
                background: activeSection === "pupils" ? "#34495e" : "none",
              }}
              onClick={() => setActiveSection("pupils")}
            >
              Pupils
            </li>
            <li
              style={{
                padding: "10px",
                cursor: "pointer",
                background: activeSection === "users" ? "#34495e" : "none",
              }}
              onClick={() => setActiveSection("users")}
            >
              Users
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        {renderContent()}
      </main>
    </div>
  );
}
