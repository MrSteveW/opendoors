'use client';
import Calendar from '@/components/calendar/Calendar';
import CreateSidebar from '@/components/sidebar/CreateSidebar';
import EditSidebar from '@/components/sidebar/EditSidebar';
import ViewSidebar from './sidebar/ViewSidebar';
import { useSidebar } from '@/stores/useSidebar';
import { useFetch } from './useFetch';
import { useUser } from '@clerk/nextjs';

type AppProps = {
  eventOptions: any;
};

export default function App({ eventOptions }: AppProps) {
  const mode = useSidebar((state) => state.mode);
  const setMode = useSidebar((state) => state.setMode);
  const setSelectedDate = useSidebar((state) => state.setSelectedDate);
  const selectedEvent = useSidebar((state) => state.selectedEvent);
  const setSelectedEvent = useSidebar((state) => state.setSelectedEvent);
  const setUnavailableTimes = useSidebar((state) => state.setUnavailableTimes);

  const { user } = useUser();
  const role = user?.publicMetadata?.role;

  const { data: eventsData, refetch } = useFetch('/api/events');

  function handleDateSelect(selectInfo) {
    if (role === 'admin' || role === 'editor') {
      setMode('Create');
      setSelectedDate(new Date(selectInfo.startStr));
      setSelectedEvent(null);
      const selectedDateStr = selectInfo.startStr.split('T')[0];
      const unavailable = eventsData
        .filter((event) => event.date.split('T')[0] === selectedDateStr)
        .map((event) => ({ time_id: event.time_id }));
      setUnavailableTimes(unavailable);
    }
  }

  function handleEventSelect(event) {
    setSelectedEvent(event);
    setSelectedDate(null);
    if (role === 'admin' || role === 'editor') {
      setMode('Edit');
    } else if (role === 'viewer') {
      setMode('View');
    }
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-row">
      <div className="w-7/10">
        <div>Options: {JSON.stringify(eventOptions)}</div>
        <Calendar
          handleDateSelect={handleDateSelect}
          handleEventSelect={handleEventSelect}
          eventsData={eventsData}
        />
      </div>
      <div className="w-3/10">
        {mode === 'Create' && (
          <CreateSidebar onEventChange={refetch} eventOptions={eventOptions} />
        )}
        {mode === 'Edit' && (
          <EditSidebar
            key={selectedEvent.id}
            onEventChange={refetch}
            eventOptions={eventOptions}
          />
        )}
        {mode === 'View' && (
          <ViewSidebar key={selectedEvent.id} eventOptions={eventOptions} />
        )}
      </div>
    </div>
  );
}
