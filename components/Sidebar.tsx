"use client";
import EventForm from "@/components/EventForm";
import EventEdit from "@/components/EventEdit";
import CancelButton from "@/components/CancelButton";
import { useFetch } from "./useFetch";
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
  const { data: bookingOptions, loading } = useFetch("/api/data");
  if (loading) return;

  return (
    <div className="h-full bg-openlightgreen flex flex-col items-center p-2">
      <div className="text-2xl ">
        {selectedDate.toLocaleString("en-GB", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
      {selectedEvent ? (
        <EventEdit selectedEvent={selectedEvent} />
      ) : (
        <EventForm
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
