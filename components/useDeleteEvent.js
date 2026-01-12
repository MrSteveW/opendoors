// useDeleteEvent.js
// Handles deleting an event, using API URL from env

const API_URL = import.meta.env.VITE_API_URL;
import { useAuth } from "@clerk/clerk-react";

export default function useDeleteEvent({
  events,
  setEvents,
  setSidebarMode,
  setSidebarEvent,
}) {
  const { getToken } = useAuth();
  return async function handleDeleteEvent(form) {
    if (!form.id && !form._id) return;
    if (!window.confirm("Are you sure you want to delete this show?")) return;
    try {
      const id = form.id || form._id;
      const token = await getToken();
      await fetch(`${API_URL}/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(events.filter((ev) => ev._id !== id && ev.id !== id));
      setSidebarMode(null);
      setSidebarEvent(null);
    } catch (err) {
      alert(err, "Failed to delete event");
    }
  };
}
