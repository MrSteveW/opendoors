'use client';
import Calendar from '@/components/calendar/Calendar';
import CreateSidebar from '@/components/sidebar/CreateSidebar';
import EditSidebar from '@/components/sidebar/EditSidebar';
import { useSidebar } from '@/stores/useSidebar';
import { useEffect } from 'react';
import { useFetch } from './useFetch';

export default function App() {
  const mode = useSidebar((state) => state.mode);
  const setMode = useSidebar((state) => state.setMode);
  const selectedDate = useSidebar((state) => state.selectedDate);
  const setSelectedDate = useSidebar((state) => state.setSelectedDate);
  const selectedEvent = useSidebar((state) => state.selectedEvent);
  const setSelectedEvent = useSidebar((state) => state.setSelectedEvent);
  const bookingOptions = useSidebar((state) => state.bookingOptions);
  const setBookingOptions = useSidebar((state) => state.setBookingOptions);

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
    setMode('Create');
    setSelectedDate(new Date(selectInfo.startStr));
    setSelectedEvent(null);
  }

  function handleEventSelect(event) {
    setMode('Edit');
    setSelectedEvent(event);
    setSelectedDate(null);
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-row">
      <div className="w-7/10">
        {/* <div>Mode: {JSON.stringify(mode)}</div>
        <div>SelectedDate: {JSON.stringify(selectedDate)}</div> */}
        <div>SelectedEvent:{JSON.stringify(selectedEvent)}</div>

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
      </div>
    </div>
  );
}
