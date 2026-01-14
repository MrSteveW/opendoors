"use client";
import Calendar from "@/components/Calendar";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";

export default function CalendarScreen() {
  // Set State
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [refreshState, setRefreshState] = useState(0);

  // Functions
  function handleDateSelect(selectInfo) {
    setSelectedDate(new Date(selectInfo.startStr));
    setShowSidebar(true);
  }

  function handleRefresh() {
    setRefreshState((prev) => prev + 1);
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-row">
      <div className="w-7/10 bg-opencream">
        <Calendar
          handleDateSelect={handleDateSelect}
          refreshState={refreshState}
        />
      </div>
      <div className="w-3/10">
        {showSidebar && (
          <Sidebar
            selectedDate={selectedDate}
            setShowSidebar={setShowSidebar}
            handleRefresh={handleRefresh}
          />
        )}
      </div>
    </div>
  );
}
