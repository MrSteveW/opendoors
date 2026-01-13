"use client";
import EventCard from "./EventCard";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useFetch } from "./useFetch";

export default function Calendar({ handleDateSelect }) {
  const { data: bookings, loading } = useFetch("/api/bookings");

  // Convert bookings into FullCalendar's event format
  const events = bookings?.map((booking) => ({
    id: booking.id,
    title: booking.name,
    start: booking.date,
    extendedProps: {
      name: booking.name,
      producer: booking.producer,
      time: booking.time,
      topic: booking.topic,
    },
  }));
  return (
    <>
      <div>
        {/* <div>{JSON.stringify(bookings)}</div> */}
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="twoWeekGrid"
          weekends={false}
          dayHeaderFormat={{ weekday: "long" }}
          views={{
            twoWeekGrid: {
              type: "dayGrid",
              duration: { weeks: 2 },
              buttonText: "2 weeks",
            },
          }}
          selectable={true}
          select={handleDateSelect}
          events={events}
          eventContent={(eventInfo) => <EventCard eventInfo={eventInfo} />}
        />
      </div>
    </>
  );
}
