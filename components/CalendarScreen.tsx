"use client";
import Calendar from "@/components/Calendar";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";

export default function CalendarScreen() {
  // Set State
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Functions
  function handleDateSelect(selectInfo) {
    setSelectedDate(new Date(selectInfo.startStr));
    setShowSidebar(true);
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-row">
      <div className="w-7/10 bg-opencream">
        <Calendar handleDateSelect={handleDateSelect} />
      </div>
      <div className="w-3/10">
        {showSidebar && (
          <Sidebar
            selectedDate={selectedDate}
            setShowSidebar={setShowSidebar}
          />
        )}
      </div>
    </div>
  );
}
