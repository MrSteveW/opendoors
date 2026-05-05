'use client';
import EventCard from './EventCard';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventsDataType } from '@/types';
import { EventContentArg, EventSourceFuncArg } from '@fullcalendar/core';
import { EventApi, DateSelectArg } from '@fullcalendar/core';

type CalendarProps = {
  handleDateSelect: (selectInfo: DateSelectArg) => void;
  handleEventSelect: (event: EventApi) => void;
};

export default function Calendar({
  handleDateSelect,
  handleEventSelect,
}: CalendarProps) {
  return (
    <>
      <div className="h-full">
        <FullCalendar
          expandRows={true}
          events={async (fetchInfo: EventSourceFuncArg) => {
            const params = new URLSearchParams({
              start: fetchInfo.startStr,
              end: fetchInfo.endStr,
            });
            const response = await fetch(`/api/events?${params}`);
            if (!response.ok) throw new Error('Failed to fetch events');
            const data: EventsDataType[] = await response.json();
            return data.map((event) => ({
              id: event.id,
              title: event.name,
              start: event.date,
              extendedProps: {
                name: event.name,
                topic: event.topic,
                class_id: event.class_id,
                producers: event.producers,
                iscomplete: event.iscomplete,
                time_id: event.time_id,
                order: event.order,
                time: event.time,
                icon: event.icon,
              },
            }));
          }}
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
