import React, { useState } from "react";
import Calendar from "./Calendar";
import ClassnamesManager from "./ClassnamesManager";
import ProducersManager from "./ProducersManager";
import Header from "./Header";
import "../App.css";

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState("classnames");

  const navigationItems = [
    {
      id: "classnames",
      label: "Classes",
      component: ClassnamesManager,
    },
    {
      id: "producers",
      label: "Producers",
      component: ProducersManager,
    },
    { id: "calendar", label: "Calendar", component: Calendar },
  ];

  const renderContent = () => {
    const activeItem = navigationItems.find((item) => item.id === activeView);
    const Component = activeItem?.component;
    return Component ? <Component /> : <ClassnamesManager />;
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "visible",
        position: "relative",
      }}
    >
      <Header />

      <div
        style={{
          display: "flex",
          flex: 1,
          height: "calc(100vh - 50px)", // Subtract header height
        }}
      >
        {/* Left Navigation Sidebar */}
        <nav
          style={{
            width: "10%",
            backgroundColor: "#f8f9fa",
            borderRight: "1px solid #dee2e6",
            padding: "1rem 0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "0 1rem",
              marginBottom: "1rem",
              borderBottom: "1px solid #dee2e6",
              paddingBottom: "1rem",
            }}
          >
            <h3
              style={{
                color: "#020265",
                fontSize: "1rem",
                margin: 0,
                textAlign: "center",
              }}
            >
              Admin
            </h3>
          </div>

          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              style={{
                background: activeView === item.id ? "#020265" : "transparent",
                color: activeView === item.id ? "white" : "#020265",
                border: "none",
                padding: "0.75rem 1rem",
                textAlign: "center",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: activeView === item.id ? "bold" : "normal",
                borderRadius: activeView === item.id ? "4px" : "0",
                margin: "0.25rem 0.5rem",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (activeView !== item.id) {
                  e.target.style.backgroundColor = "#e9ecef";
                }
              }}
              onMouseLeave={(e) => {
                if (activeView !== item.id) {
                  e.target.style.backgroundColor = "transparent";
                }
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Main Content Area */}
        <main
          style={{
            width: "90%",
            padding: "2rem",
            overflow: "auto",
            backgroundColor: "#ffefd5",
          }}
        >
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
