"use client";
import Calendar from "@/components/calendar/Calendar";
import Sidebar from "@/components/sidebar/Sidebar";
import { useState } from "react";

export default function CalendarScreen() {
  // Set State
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [refreshState, setRefreshState] = useState(0);

  // Functions
  function handleDateSelect(selectInfo) {
    setSelectedDate(new Date(selectInfo.startStr));
    setShowSidebar(true);
  }

  function handleEventSelect(event) {
    setSelectedEvent(event);
    setShowSidebar(true);
  }

  function handleRefresh() {
    setRefreshState((prev) => prev + 1);
  }

  // function handleBookingSelect

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-row">
      <div className="w-7/10">
        {/* <div className="w-full text-center">
          {JSON.stringify(selectedEvent)}
        </div> */}
        <Calendar
          handleDateSelect={handleDateSelect}
          handleEventSelect={handleEventSelect}
          refreshState={refreshState}
        />
      </div>
      <div className="w-3/10">
        {showSidebar && (
          <Sidebar
            selectedDate={selectedDate}
            selectedEvent={selectedEvent}
            setShowSidebar={setShowSidebar}
            handleRefresh={handleRefresh}
          />
        )}
      </div>
    </div>
  );
}
