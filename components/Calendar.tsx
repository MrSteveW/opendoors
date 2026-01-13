"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function Calendar() {
  return (
    <>
      <div className=" ">
        <FullCalendar
          plugins={[dayGridPlugin]}
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
        />
      </div>
    </>
  );
}
