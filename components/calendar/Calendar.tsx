'use client';
import EventCard from './EventCard';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

type CalendarProps = {
  handleDateSelect: (selectInfo: any) => void;
  handleEventSelect: (event: any) => void;
  eventsData: [];
};

export default function Calendar({
  handleDateSelect,
  handleEventSelect,
  eventsData,
}: CalendarProps) {
  // Convert events into FullCalendar's event format
  const events = eventsData?.map((event) => ({
    id: event.id,
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
          eventContent={(eventInfo) => (
            <EventCard
              eventInfo={eventInfo}
              handleEventSelect={handleEventSelect}
            />
          )}
        />
      </div>
    </>
  );
}
