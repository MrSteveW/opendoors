// useSaveEdit.js
// Handles saving edits to an event, using API URL from env

const API_URL = import.meta.env.VITE_API_URL;
import { useAuth } from "@clerk/clerk-react";

export default function useSaveEdit({
  setEvents,
  setSidebarMode,
  setSidebarEvent,
}) {
  const { getToken } = useAuth();
  return async function handleSaveEdit(form) {
    const id = form._id || form.id;
    // Remove _id from the body
    const { _id, ...body } = form;
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      await res.json();
      // Refetch all events to ensure calendar is up to date
      const allRes = await fetch(`${API_URL}/events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const allEvents = await allRes.json();
      setEvents(allEvents);
      setSidebarMode(null);
      setSidebarEvent(null);
    } catch (err) {
      alert(err, "Failed to update event");
    }
  };
}
