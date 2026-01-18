'use client';
import Calendar from '@/components/calendar/Calendar';
import CreateSidebar from '@/components/sidebar/CreateSidebar';
import EditSidebar from '@/components/sidebar/EditSidebar';
import ViewSidebar from './sidebar/ViewSidebar';
import { useSidebar } from '@/stores/useSidebar';
import { useEffect } from 'react';
import { useFetch } from './useFetch';
import { useUser } from '@clerk/nextjs';

export default function App() {
  const mode = useSidebar((state) => state.mode);
  const setMode = useSidebar((state) => state.setMode);
  const selectedDate = useSidebar((state) => state.selectedDate);
  const setSelectedDate = useSidebar((state) => state.setSelectedDate);
  const selectedEvent = useSidebar((state) => state.selectedEvent);
  const setSelectedEvent = useSidebar((state) => state.setSelectedEvent);
  const bookingOptions = useSidebar((state) => state.bookingOptions);
  const setBookingOptions = useSidebar((state) => state.setBookingOptions);
  const { user } = useUser();
  const role = user?.publicMetadata?.role;

  const { data: eventsData, refetch } = useFetch('/api/events');

  // Fetch bookingOptions on mount
  useEffect(() => {
    async function fetchBookingOptions() {
      try {
        const response = await fetch('/api/optionsdata');
        const data = await response.json();
        setBookingOptions(data);
      } catch (error) {
        console.error('Failed to fetch booking options:', error);
        setBookingOptions(null);
      }
    }

    fetchBookingOptions();
  }, [setBookingOptions]);

  //
  function handleDateSelect(selectInfo) {
    if (role === 'admin' || role === 'editor') {
      setMode('Create');
      setSelectedDate(new Date(selectInfo.startStr));
      setSelectedEvent(null);
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
        <Calendar
          handleDateSelect={handleDateSelect}
          handleEventSelect={handleEventSelect}
          eventsData={eventsData}
        />
      </div>
      <div className="w-3/10">
        {mode === 'Create' && <CreateSidebar onEventChange={refetch} />}
        {mode === 'Edit' && (
          <EditSidebar key={selectedEvent.id} onEventChange={refetch} />
        )}
        {mode === 'View' && <ViewSidebar key={selectedEvent.id} />}
      </div>
    </div>
  );
}
