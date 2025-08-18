import React from "react";

export default function BookingSlot({ booking, field, label, onEdit }) {
  return (
    <td>
      {booking[field] || ""}{" "}
      <button onClick={() => onEdit({ id: booking._id, field })}>Book</button>
    </td>
  );
}
