// src/components/EventLabel.jsx
import React from "react";

export default function EventLabel({ eventInfo }) {
  const slot = eventInfo.event.extendedProps?.time || eventInfo.event.time;
  let dotColor = "#bbb";
  let dotLabel = slot;
  if (slot === "Daily Mile") {
    dotColor = "#27ae60";
    dotLabel = "Daily Mile";
  } else if (slot === "Live at Lunch") {
    dotColor = "#007385ff";
    dotLabel = "Live at Lunch";
  } else if (slot === "After Lunch") {
    dotColor = "#ef2929";
    dotLabel = "After Lunch";
  }
  return (
    <span
      className="fc-event"
      style={{ display: "flex", alignItems: "center", gap: 2 }}
    >
      <span style={{ display: "flex", alignItems: "center" }}>
        <span
          style={{
            display: "inline-block",
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: dotColor,
            marginRight: 4,
          }}
        />
        <span className="calendar-event-label" style={{ color: dotColor }}>
          {dotLabel}
        </span>
      </span>
      <div className="calendar-event-name">{eventInfo.event.title}</div>{" "}
      {/* shows name */}
    </span>
  );
}
