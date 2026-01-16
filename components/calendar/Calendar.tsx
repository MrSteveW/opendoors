'use client';
import EventCard from './EventCard';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useFetch } from '../useFetch';

type CalendarProps = {
  handleDateSelect: (selectInfo: any) => void;
  handleEventSelect: (event: any) => void;
};

export default function Calendar({
  handleDateSelect,
  handleEventSelect,
}: CalendarProps) {
  const { data: bookings } = useFetch('/api/bookings');

  // Convert bookings into FullCalendar's event format
  const events = bookings?.map((booking) => ({
    id: booking.id,
    title: booking.name,
    start: booking.date,
    order: booking.order,
    extendedProps: {
      name: booking.name,
      class_id: booking.class_id,
      producer_id: booking.producer_id,
      producer: booking.producer,
      time_id: booking.time_id,
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
