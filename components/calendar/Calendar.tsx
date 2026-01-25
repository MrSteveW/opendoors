'use client';
import EventCard from './EventCard';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventsDataType } from '@/types';
import { EventContentArg } from '@fullcalendar/core';
import { EventApi, DateSelectArg } from '@fullcalendar/core';
import { EventInput } from '@fullcalendar/core';

type CalendarProps = {
  handleDateSelect: (selectInfo: DateSelectArg) => void;
  handleEventSelect: (event: EventApi) => void;
  eventsData?: EventsDataType[] | null;
};

export default function Calendar({
  handleDateSelect,
  handleEventSelect,
  eventsData,
}: CalendarProps) {
  // Convert events into FullCalendar's event format
  const events: EventInput[] = (eventsData ?? []).map((event) => ({
    id: String(event.id),
    title: event.name,
    start: event.date,
    order: event.order,
    extendedProps: {
      name: event.name,
      class_id: event.class_id,
      producer_id: event.producer_id,
      producer: event.producer,
      time_id: event.time_id,
      time: event.time,
      topic: event.topic,
    },
  }));

  return (
    <>
      <div className="h-full">
        <FullCalendar
          expandRows={true}
          events={events}
          eventContent={(arg: EventContentArg) => (
            <EventCard eventInfo={arg} handleEventSelect={handleEventSelect} />
          )}
          handleWindowResize={true}
          height="100%"
          titleFormat={{ month: 'long', day: 'numeric', year: 'numeric' }}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="twoWeekGrid"
          weekends={false}
          dayHeaderFormat={{ weekday: 'long' }}
          views={{
            twoWeekGrid: {
              type: 'dayGrid',
              duration: { weeks: 2 },
              buttonText: '2 weeks',
            },
          }}
          selectable={true}
          eventOrder="order"
          select={handleDateSelect}
        />
      </div>
    </>
  );
}
