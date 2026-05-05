'use client';
import Calendar from '@/components/calendar/Calendar';
import { useEventDialog } from '@/stores/useEventDialog';
import { useUser } from '@clerk/nextjs';
import { EventsDataType, EventOptionsType } from '@/types';
import { DateSelectArg } from '@fullcalendar/core/index.js';
import { EventApi } from '@fullcalendar/core';
import { EventDialog } from './EventDialog';

type AppProps = {
  eventOptions: EventOptionsType;
};

export default function App({ eventOptions }: AppProps) {
  const setIsDialogOpen = useEventDialog((state) => state.setIsDialogOpen);
  const setSelectedDate = useEventDialog((state) => state.setSelectedDate);
  const setSelectedEvent = useEventDialog((state) => state.setSelectedEvent);
  const setUnavailableTimes = useEventDialog(
    (state) => state.setUnavailableTimes,
  );
  const setIsReadOnly = useEventDialog((state) => state.setIsReadOnly);

  const { user } = useUser();
  const role = user?.publicMetadata?.user_role;

  async function handleDateSelect(selectInfo: DateSelectArg) {
    if (role === 'admin' || role === 'producer') {
      const selectedDateStr = selectInfo.startStr.split('T')[0];
      const params = new URLSearchParams({ start: selectedDateStr, end: selectedDateStr });
      const response = await fetch(`/api/events?${params}`);
      const dayEvents: EventsDataType[] = await response.json();
      const unavailable = dayEvents.map((event) => ({ time_id: event.time_id }));
      setUnavailableTimes(unavailable);
      setIsDialogOpen(true);
      setSelectedDate(new Date(selectInfo.startStr));
      setSelectedEvent(null);
      setIsReadOnly(false);
    }
  }

  function handleEventSelect(event: EventApi) {
    setSelectedEvent(event);
    setSelectedDate(null);
    if (role === 'admin' || role === 'producer') {
      setIsDialogOpen(true);
      setIsReadOnly(false);
    } else {
      setIsReadOnly(true);
      setIsDialogOpen(true);
    }
  }

  return (
    <div className="h-screen flex flex-row">
      <div className="w-full">
        <EventDialog eventOptions={eventOptions} />
        <Calendar
          handleDateSelect={handleDateSelect}
          handleEventSelect={handleEventSelect}
        />
      </div>
    </div>
  );
}
