"use client";
import Calendar from "@/components/Calendar";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";

export default function CalendarScreen() {
  const [showSidebar, setShowSidebar] = useState(false);
  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-row">
      <div className="w-7/10 bg-opencream">
        <button onClick={toggleSidebar}>YO!</button>
        <Calendar />
      </div>
      <div className="w-3/10">{showSidebar && <Sidebar />}</div>
    </div>
  );
}
