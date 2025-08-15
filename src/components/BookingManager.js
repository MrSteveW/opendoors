import React, { useState, useEffect } from "react";

export default function Booking() {
  const [bookings, setBookings] = useState([]);
  const [pupils, setPupils] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeSlot, setActiveSlot] = useState(null); // which slot is being edited

  // Fetch today's booking(s)
  const fetchBookings = async (autoCreateIfEmpty = false) => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3001/api/v1/bookings");
      const data = await res.json();

      if (data.length === 0 && autoCreateIfEmpty) {
        await createBooking();
        return;
      }
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch pupils
  const fetchPupils = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/v1/pupils");
      const data = await res.json();
      setPupils(data);
    } catch (error) {
      console.error("Error fetching pupils:", error);
    }
  };

  // Create today's booking
  const createBooking = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/v1/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first: "", second: "", third: "" }),
      });
      if (!res.ok) {
        console.warn("Booking creation failed:", await res.json());
        return;
      }
      await fetchBookings(false);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  // Update booking slot
  const updateSlot = async (id, field, value) => {
    try {
      await fetch(`http://localhost:3001/api/v1/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      setActiveSlot(null); // hide pupil selection after choosing
      await fetchBookings(false);
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  useEffect(() => {
    fetchBookings(true);
    fetchPupils();
  }, []);

  return (
    <div>
      <h1>Today's Booking</h1>
      {loading && <p>Loading...</p>}

      {!loading && bookings.length === 0 && <p>No booking for today.</p>}

      {!loading &&
        bookings.map((booking) => (
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
                <td>
                  {booking.first || ""}{" "}
                  <button
                    onClick={() =>
                      setActiveSlot({ id: booking._id, field: "first" })
                    }
                  >
                    Book
                  </button>
                </td>
                <td>
                  {booking.second || ""}{" "}
                  <button
                    onClick={() =>
                      setActiveSlot({ id: booking._id, field: "second" })
                    }
                  >
                    Book
                  </button>
                </td>
                <td>
                  {booking.third || ""}{" "}
                  <button
                    onClick={() =>
                      setActiveSlot({ id: booking._id, field: "third" })
                    }
                  >
                    Book
                  </button>
                </td>
                <td>
                  {booking.fourth || ""}{" "}
                  <button
                    onClick={() =>
                      setActiveSlot({ id: booking._id, field: "fourth" })
                    }
                  >
                    Book
                  </button>
                </td>
                <td>
                  {booking.fifth || ""}{" "}
                  <button
                    onClick={() =>
                      setActiveSlot({ id: booking._id, field: "fifth" })
                    }
                  >
                    Book
                  </button>
                </td>
                <td>
                  {booking.sixth || ""}{" "}
                  <button
                    onClick={() =>
                      setActiveSlot({ id: booking._id, field: "sixth" })
                    }
                  >
                    Book
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ))}

      {/* Show pupil selection buttons if editing */}
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
              {pupil.name} ({pupil.class}, {pupil.year})
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
