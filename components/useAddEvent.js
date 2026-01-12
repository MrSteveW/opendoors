// Use environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL;
import React from "react";
import { useAuth } from "@clerk/clerk-react";

/**
 * Handles adding a new event, including duplicate slot prevention and backend POST.
 * @param {Object} params
 * @param {Object[]} params.events - Current list of events
 * @param {Function} params.setEvents - Setter for events
 * @param {Function} params.setSidebarMode - Setter for sidebar mode
 * @param {Function} params.setSidebarEvent - Setter for sidebar event
 * @returns {Function} handleAddEvent(form)
 */
export default function useAddEvent({
  events,
  setEvents,
  setSidebarMode,
  setSidebarEvent,
}) {
  const { getToken } = useAuth();
  return async function handleAddEvent(form) {
    // Prevent duplicate time slot per day
    const selectedDate = new Date(form.date).toDateString();
    const exists = events.some((ev) => {
      const evDate = new Date(ev.date || ev.start).toDateString();
      return (
        evDate === selectedDate &&
        (ev.time || ev.extendedProps?.time) === form.time
      );
    });
    if (exists) {
      alert("There is already an event for this time slot on this day.");
      return;
    }
    // Remove any existing event for this slot on this day (for dropdown logic)
    const filteredEvents = events.filter((ev) => {
      const evDate = new Date(ev.date || ev.start).toDateString();
      return !(
        evDate === selectedDate &&
        (ev.time || ev.extendedProps?.time) === form.time
      );
    });
    const newEvent = {
      title: form.title,
      date: form.date,
      time: form.time,
      topic: form.topic,
      classname: form.classname,
    };
    try {
      const token = await getToken();
      console.log("Clerk session token:", token);
      const res = await fetch(`${API_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEvent),
      });
      const saved = await res.json();
      setEvents([...filteredEvents, saved]);
      setSidebarMode(null);
      setSidebarEvent(null);
    } catch (err) {
      alert(err, "Failed to save event");
    }
  };
}
