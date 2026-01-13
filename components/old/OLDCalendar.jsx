"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useUserRole } from "./useUserRole";
import Header from "./Header";
const API_URL = import.meta.env.VITE_API_URL;
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CalendarSidebar from "./CalendarSidebar";
import EventCard from "./EventCard";
import useAddEvent from "./useAddEvent";
import useEventClick from "./useEventClick";
import useSaveEdit from "./useSaveEdit";
import useDeleteEvent from "./useDeleteEvent";

function getValidRange() {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay());
  const end = new Date(start);
  end.setDate(start.getDate() + 13);
  return { start, end };
}

export default function Calendar() {
  const { getToken } = useAuth();
  const { hasWriteAccess } = useUserRole();
  const weekendsVisible = false;
  const [sidebarMode, setSidebarMode] = useState(null); // 'add' | 'view' | 'edit'
  const [sidebarEvent, setSidebarEvent] = useState(null); // event data for sidebar
  const [events, setEvents] = useState([]);

  // Fetch events from backend on mount with Clerk auth
  useEffect(() => {
    async function fetchEvents() {
      try {
        const token = await getToken();
        const res = await fetch(`${API_URL}/events`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events", err);
      }
    }
    fetchEvents();
  }, [getToken]);

  function handleDateSelect(selectInfo) {
    // Only allow admins and editors to add events
    if (!hasWriteAccess) {
      return;
    }
    setSidebarMode("add");
    setSidebarEvent({
      date: selectInfo.startStr,
      title: "",
      classname: "",
      time: "",
      topic: "",
    });
  }

  const handleEventClick = useEventClick({ setSidebarMode, setSidebarEvent });

  const handleAddEvent = useAddEvent({
    events,
    setEvents,
    setSidebarMode,
    setSidebarEvent,
  });

  function handleEditEvent(form) {
    // Only allow admins and editors to edit events
    if (!hasWriteAccess) {
      return;
    }
    setSidebarMode("edit");
    setSidebarEvent(form);
  }

  const handleSaveEdit = useSaveEdit({
    setEvents,
    setSidebarMode,
    setSidebarEvent,
  });

  const handleDeleteEvent = useDeleteEvent({
    events,
    setEvents,
    setSidebarMode,
    setSidebarEvent,
  });

  function handleCancelSidebar() {
    setSidebarMode(null);
    setSidebarEvent(null);
  }

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
      <div className="calendar-layout">
        <div className="calendar-main">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "",
              center: "",
              right: "",
            }}
            initialView="twoWeekGrid"
            views={{
              twoWeekGrid: {
                type: "dayGrid",
                duration: { weeks: 2 },
                buttonText: "2 weeks",
              },
            }}
            dayHeaderFormat={{ weekday: "long" }}
            validRange={getValidRange()}
            editable={hasWriteAccess} // Allow admins and editors to edit
            selectable={hasWriteAccess} // Allow admins and editors to select dates
            selectMirror={hasWriteAccess}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            events={events}
            select={handleDateSelect}
            eventContent={(eventInfo) => <EventCard eventInfo={eventInfo} />}
            eventClick={handleEventClick}
            height="100%"
            fixedWeekCount={false}
            eventOrder={(a, b) => {
              const order = {
                "Daily Mile": 1,
                "Live at Lunch": 2,
                "After Lunch": 3,
              };
              const ta = a.extendedProps?.time || a.time || "";
              const tb = b.extendedProps?.time || b.time || "";
              return (order[ta] || 99) - (order[tb] || 99);
            }}
          />
        </div>
        <div className="calendar-sidebar">
          {sidebarMode && (
            <CalendarSidebar
              mode={sidebarMode}
              eventData={sidebarEvent}
              onAdd={handleAddEvent}
              onEdit={sidebarMode === "view" ? handleEditEvent : handleSaveEdit}
              onDelete={handleDeleteEvent}
              onCancel={handleCancelSidebar}
              events={events} // <-- pass events here
            />
          )}
        </div>
      </div>
    </div>
  );
}
