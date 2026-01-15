"use client";
import EventCreate from "@/components/sidebar/EventCreate";
import EventEdit from "@/components/sidebar/EventEdit";
import CancelButton from "@/components/sidebar/CancelButton";
import { useFetch } from "../useFetch";
import { EventType } from "@/types";

type SidebarProps = {
  selectedDate: Date;
  selectedEvent: EventType;
  setShowSidebar: (show: boolean) => void;
  handleRefresh: () => void;
};

//
export default function Sidebar({
  selectedDate,
  selectedEvent,
  setShowSidebar,
  handleRefresh,
}: SidebarProps) {
  const { data: bookingOptions, loading } = useFetch("/api/optionsdata");
  if (loading) return;

  return (
    <div className="h-full bg-openlightgreen flex flex-col items-center p-2 rounded-3xl">
      {selectedEvent ? (
        <EventEdit
          key={selectedEvent.id}
          selectedEvent={selectedEvent}
          bookingOptions={bookingOptions}
          handleRefresh={handleRefresh}
          setShowSidebar={setShowSidebar}
        />
      ) : (
        <EventCreate
          bookingOptions={bookingOptions}
          selectedDate={selectedDate}
          handleRefresh={handleRefresh}
          setShowSidebar={setShowSidebar}
        />
      )}

      <div className="">
        <CancelButton setShowSidebar={setShowSidebar} />
      </div>
    </div>
  );
}
