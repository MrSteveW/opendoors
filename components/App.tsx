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

type AppProps = {
  eventOptions: EventOptionsType;
  eventsData: EventsDataType[];
};

export default function App({ eventOptions, eventsData }: AppProps) {
  const mode = useSidebar((state) => state.mode);
  const setMode = useSidebar((state) => state.setMode);
  const setSelectedDate = useSidebar((state) => state.setSelectedDate);
  const selectedEvent = useSidebar((state) => state.selectedEvent);
  const setSelectedEvent = useSidebar((state) => state.setSelectedEvent);
  const setUnavailableTimes = useSidebar((state) => state.setUnavailableTimes);

  const { user } = useUser();
  const role = user?.publicMetadata?.role;

  function handleDateSelect(selectInfo: DateSelectArg) {
    if (role === 'admin' || role === 'editor') {
      setMode('Create');
      setSelectedDate(new Date(selectInfo.startStr));
      setSelectedEvent(null);
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
    } else {
      setMode('View');
    }
  }

  return (
    <div className="h-screen flex flex-row">
      <div className="w-7/10">
        <Calendar
          handleDateSelect={handleDateSelect}
          handleEventSelect={handleEventSelect}
          eventsData={eventsData}
        />
      </div>
      <div className="w-3/10">
        {mode === 'Create' && <CreateSidebar eventOptions={eventOptions} />}
        {mode === 'Edit' && (
          <EditSidebar key={selectedEvent?.id} eventOptions={eventOptions} />
        )}
        {mode === 'View' && <ViewSidebar key={selectedEvent?.id} />}
      </div>
    </div>
  );
}
