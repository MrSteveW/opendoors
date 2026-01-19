'use client';
import EventCard from './EventCard';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventsData } from '@/types';
import { EventContentArg } from '@fullcalendar/core';
import { DateSelectArg, EventApi } from '@fullcalendar/core';
import { EventInput } from '@fullcalendar/core';

type CalendarProps = {
  handleDateSelect: (selectInfo: DateSelectArg) => void;
  handleEventSelect: (event: EventApi) => void;
  eventsData?: EventsData[] | null;
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
      <div>
        <FullCalendar
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
          aspectRatio={1.9}
          selectable={true}
          eventOrder="order"
          select={handleDateSelect}
          events={events}
          eventContent={(arg: EventContentArg) => (
            <EventCard eventInfo={arg} handleEventSelect={handleEventSelect} />
          )}
        />
      </div>
    </>
  );
}
