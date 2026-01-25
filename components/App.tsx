'use client';
import Calendar from '@/components/calendar/Calendar';
import CreateSidebar from '@/components/sidebar/CreateSidebar';
import EditSidebar from '@/components/sidebar/EditSidebar';
import ViewSidebar from './sidebar/ViewSidebar';
import { useSidebar } from '@/stores/useSidebar';
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
  const setIsDialogOpen = useSidebar((state) => state.setIsDialogOpen)
  const mode = useSidebar((state) => state.mode);
  const setMode = useSidebar((state) => state.setMode);
  const setSelectedDate = useSidebar((state) => state.setSelectedDate);
  const selectedEvent = useSidebar((state) => state.selectedEvent);
  const setSelectedEvent = useSidebar((state) => state.setSelectedEvent);
  const setUnavailableTimes = useSidebar((state) => state.setUnavailableTimes);
  const setIsReadOnly = useSidebar((state) => state.setIsReadOnly);

  const { user } = useUser();
  const role = user?.publicMetadata?.role;

  function handleDateSelect(selectInfo: DateSelectArg) {
    if (role === 'admin' || role === 'editor') {
      setMode('Create');
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
      setMode('Edit');
      setIsDialogOpen(true);
      setIsReadOnly(false);
    } else {
      setMode('View');
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
