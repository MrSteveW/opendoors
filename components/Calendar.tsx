"use client";
import EventCard from "./EventCard";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useFetch } from "./useFetch";

type CalendarProps = {
  handleDateSelect: () => void;
  setSelectedEvent: () => void;
  refreshState: number;
};

export default function Calendar({
  handleDateSelect,
  setSelectedEvent,
  refreshState,
}: CalendarProps) {
  const { data: bookings } = useFetch("/api/bookings", refreshState);

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
          aspectRatio={1.9}
          selectable={true}
          select={handleDateSelect}
          events={events}
          eventContent={(eventInfo) => (
            <EventCard
              eventInfo={eventInfo}
              setSelectedEvent={setSelectedEvent}
            />
          )}
        />
      </div>
    </>
  );
}
