import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function BookingManager() {
  const [bookings, setBookings] = useState([]);
  const [pupils, setPupils] = useState([]);
  const [activeSlot, setActiveSlot] = useState(null); // which slot is being edited
  const BOOKINGS_URL = "http://localhost:3001/api/v1/bookings";
  const PUPILS_URL = "http://localhost:3001/api/v1/pupils";

  // helper to get headers with token
  const authHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  // ==============================
  // BOOKINGS
  // ==============================

  // Fetch today's bookings
  const fetchBookings = async () => {
    try {
      const res = await fetch(BOOKINGS_URL, {
        method: "GET",
        headers: authHeaders(),
      });

      if (res.status === 401) {
        console.error("Login required");
        return;
      }
      if (res.status === 403) {
        console.error("Invalid or expired token");
        return;
      }

      const data = await res.json();

      // Auto-create if empty
      if (data.length === 0) {
        await createBooking();
        return;
      }

      setBookings(data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  // Create today's booking
  const createBooking = async () => {
    try {
      const res = await fetch(BOOKINGS_URL, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          first: "",
          second: "",
          third: "",
          fourth: "",
          fifth: "",
          sixth: "",
        }),
      });

      if (!res.ok) {
        console.error("Booking creation failed:", await res.json());
        return;
      }

      fetchBookings();
    } catch (err) {
      console.error("Error creating booking:", err);
    }
  };

  // Update booking slot
  const updateSlot = async (id, field, value) => {
    try {
      const res = await fetch(`${BOOKINGS_URL}/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ [field]: value }),
      });

      if (res.ok) {
        setActiveSlot(null);
        fetchBookings();
      } else {
        console.error("Failed to update booking");
      }
    } catch (err) {
      console.error("Error updating booking:", err);
    }
  };

  // ==============================
  // PUPILS
  // ==============================

  const fetchPupils = async () => {
    try {
      const res = await fetch(PUPILS_URL, {
        method: "GET",
        headers: authHeaders(),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Server error:", text);
        return;
      }

      const data = await res.json();

      // ✅ Decode token and extract classname
      const token = localStorage.getItem("token");
      let classname = null;
      if (token) {
        const decoded = jwtDecode(token);
        classname = decoded.classname; // <-- comes from backend payload
      }

      // ✅ Filter pupils by classname
      const filtered = data.filter((pupil) => pupil.classname === classname);

      setPupils(filtered);
    } catch (err) {
      console.error("Error fetching pupils:", err);
    }
  };

  // ==============================
  // INIT
  // ==============================

  useEffect(() => {
    fetchBookings();
    fetchPupils();
  }, []);

  // ==============================
  // RENDER
  // ==============================

  return (
    <div>
      <h1>Today's Booking</h1>
      {bookings.map((booking) => (
        <table key={booking._id} border="1" style={{ marginTop: "10px" }}>
          <thead>
            <tr>
              <th>12:00</th>
              <th>12:10</th>
              <th>12:20</th>
              <th>12:30</th>
              <th>12:40</th>
              <th>12:50</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {["first", "second", "third", "fourth", "fifth", "sixth"].map(
                (slot) => (
                  <td key={slot}>
                    {booking[slot] || ""}{" "}
                    <button
                      onClick={() =>
                        setActiveSlot({ id: booking._id, field: slot })
                      }
                    >
                      Book
                    </button>
                  </td>
                )
              )}
            </tr>
          </tbody>
        </table>
      ))}

      {/* Show pupil selection if editing a slot */}
      {activeSlot && (
        <div style={{ marginTop: "20px" }}>
          <h3>Select Pupil for {activeSlot.field} slot:</h3>
          {pupils.map((pupil) => (
            <button
              key={pupil._id}
              onClick={() =>
                updateSlot(activeSlot.id, activeSlot.field, pupil.name)
              }
              style={{ margin: "5px" }}
            >
              {pupil.name} ({pupil.classname}){" "}
              {/*remove when you don't want to show classname*/}
            </button>
          ))}
          <div>
            <button
              onClick={() => setActiveSlot(null)}
              style={{ marginTop: "10px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
