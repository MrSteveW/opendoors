'use client';
import Calendar from '@/components/calendar/Calendar';
import CreateSidebar from '@/components/sidebar/CreateSidebar';
import EditSidebar from '@/components/sidebar/EditSidebar';
import ViewSidebar from './sidebar/ViewSidebar';
import { useEventDialog } from '@/stores/useEventDialog';
import { useUser } from '@clerk/nextjs';
import { EventsDataType, EventOptionsType } from '@/types';
import { DateSelectArg } from '@fullcalendar/core/index.js';
import { EventApi } from '@fullcalendar/core';
import { EventDialog } from './EventDialog';
type AppProps = {
  eventOptions: EventOptionsType;
  eventsData: EventsDataType[];
};

export default function App({ eventOptions, eventsData }: AppProps) {
  const setIsDialogOpen = useEventDialog((state) => state.setIsDialogOpen)
  const setSelectedDate = useEventDialog((state) => state.setSelectedDate);
  const selectedEvent = useEventDialog((state) => state.selectedEvent);
  const setSelectedEvent = useEventDialog((state) => state.setSelectedEvent);
  const setUnavailableTimes = useEventDialog((state) => state.setUnavailableTimes);
  const setIsReadOnly = useEventDialog((state) => state.setIsReadOnly);

  const { user } = useUser();
  const role = user?.publicMetadata?.role;

  function handleDateSelect(selectInfo: DateSelectArg) {
    if (role === 'admin' || role === 'editor') {
      setIsDialogOpen(true);
      setSelectedDate(new Date(selectInfo.startStr));
      setSelectedEvent(null);
      setIsReadOnly(false);
      const selectedDateStr = selectInfo.startStr.split('T')[0];
      const unavailable = (eventsData ?? [])
        .filter((event) => {
          const eventDate = new Date(event.date).toISOString().split('T')[0];
          return eventDate === selectedDateStr;
        })
        .map((event) => ({ time_id: event.time_id }));
      setUnavailableTimes(unavailable);
    }
  }

  function handleEventSelect(event: EventApi) {
    setSelectedEvent(event);
    setSelectedDate(null);
    if (role === 'admin' || role === 'editor') {
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
          eventsData={eventsData}
        />
      </div>
    </div>
  );
}
