import React, { useState, useEffect } from "react";
import { useUserRole } from "./useUserRole";
import { useAuth } from "@clerk/clerk-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function CalendarSidebar({
  mode, // "add" | "view" | "edit"
  eventData, // { title, classname, time, topic, date, id }
  onAdd,
  onEdit,
  onDelete,
  onCancel,
  events = [], // pass all events from parent
}) {
  const { hasWriteAccess } = useUserRole();
  const { getToken } = useAuth();
  const [classNames, setClassNames] = useState([]);
  const [producers, setProducers] = useState([]);
  const [form, setForm] = useState(
    eventData || {
      title: "",
      classname: "",
      producer: "",
      time: "",
      topic: "",
      date: "",
    }
  );

  // Fetch class names from the database
  const fetchClassNames = async () => {
    try {
      const token = await getToken();
      const response = await fetch(`${API_URL}/class`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setClassNames(data);
      }
    } catch (error) {
      console.error("Error fetching class names:", error);
      setClassNames([]);
    }
  };

  // Fetch producers from the database
  const fetchProducers = async () => {
    try {
      const token = await getToken();
      const response = await fetch(`${API_URL}/producers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProducers(data);
      }
    } catch (error) {
      console.error("Error fetching producers:", error);
      setProducers([]);
    }
  };

  // Fetch class names and producers on component mount
  useEffect(() => {
    fetchClassNames();
    fetchProducers();
  }, []);

  // Add this effect:
  useEffect(() => {
    // Always preserve _id if present in eventData
    setForm(
      eventData
        ? { ...eventData, _id: eventData._id || eventData.id }
        : {
            title: "",
            classname: "",
            producer: "",
            time: "",
            topic: "",
            date: "",
          }
    );
  }, [eventData]);

  // Update form state on input change
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  // Render form fields
  function renderFormFields(disabled = false) {
    // Find taken slots for the selected date (ignore current event in edit mode)
    const takenSlots = new Set();
    if (form.date) {
      events.forEach((ev) => {
        const evDate = new Date(ev.date || ev.start).toDateString();
        if (
          evDate === new Date(form.date).toDateString() &&
          // Allow editing: don't block the slot if it's the current event
          (!form._id || (ev._id !== form._id && ev.id !== form._id))
        ) {
          takenSlots.add(
            ev.time || (ev.extendedProps && ev.extendedProps.time)
          );
        }
      });
    }
    const timeOptions = [
      { value: "Daily Mile", label: "Daily Mile" },
      { value: "Live at Lunch", label: "Live at Lunch" },
      { value: "After Lunch", label: "After Lunch" },
    ];
    return (
      <>
        {form.date && (
          <div class="sidebar-date">
            <b>Date:</b>{" "}
            {new Date(form.date).toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        )}
        <div>
          <label>
            Name:
            <input
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              disabled={disabled}
              autoFocus
            />
          </label>
        </div>
        <div>
          <label>
            Class:
            <select
              name="classname"
              value={form.classname}
              onChange={handleChange}
              disabled={disabled}
            >
              <option value="">Select class</option>
              {classNames.map((classItem) => (
                <option key={classItem._id} value={classItem.classname}>
                  {classItem.classname}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Producer:
            <select
              name="producer"
              value={form.producer}
              onChange={handleChange}
              disabled={disabled}
              style={{ width: "270px", maxWidth: "100%" }}
            >
              <option value="">Select a producer</option>
              {producers.map((producerItem) => (
                <option key={producerItem._id} value={producerItem.producer}>
                  {producerItem.producer}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>
            Time:
            <select
              name="time"
              value={form.time}
              onChange={handleChange}
              disabled={disabled}
            >
              <option value="">Select a time slot</option>
              {timeOptions.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  disabled={takenSlots.has(opt.value)}
                >
                  {opt.label}
                  {takenSlots.has(opt.value) ? " (taken)" : ""}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Topic:
            <textarea
              className="topic"
              name="topic"
              type="text"
              value={form.topic}
              onChange={handleChange}
              disabled={disabled}
            />
          </label>
        </div>
      </>
    );
  }

  // Render buttons based on mode and user role
  function renderButtons() {
    if (mode === "add" && hasWriteAccess) {
      return (
        <>
          <button onClick={() => onAdd(form)}>Add</button>
          <button onClick={onCancel}>Cancel</button>
        </>
      );
    }
    if (mode === "edit" && hasWriteAccess) {
      return (
        <>
          <button onClick={() => onEdit(form)}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </>
      );
    }
    if (mode === "view") {
      return (
        <>
          {hasWriteAccess && (
            <button onClick={() => onEdit(eventData)}>Edit</button>
          )}
          {hasWriteAccess && (
            <button onClick={() => onDelete(eventData)}>Delete</button>
          )}
          <button onClick={onCancel}>Close</button>
        </>
      );
    }
    return null;
  }

  return (
    <div>
      <h2>
        {mode === "add"
          ? "Add radio show"
          : mode === "edit"
          ? "Edit show"
          : "Show details"}
        {!hasWriteAccess && mode === "view" && (
          <div
            style={{ fontSize: "0.8rem", color: "#666", fontWeight: "normal" }}
          >
            (View only)
          </div>
        )}
      </h2>
      {renderFormFields(mode === "view")}
      {renderButtons()}
    </div>
  );
}
