"use client";
import EventForm from "@/components/EventForm";
import CancelButton from "@/components/CancelButton";
import { useFetch } from "./useFetch";

type SidebarProps = {
  selectedDate: Date;
  setShowSidebar: (show: boolean) => void;
  handleRefresh: () => void;
};

//
export default function Sidebar({
  selectedDate,
  setShowSidebar,
  handleRefresh,
}: SidebarProps) {
  const { data: bookingData, loading } = useFetch("/api/data");
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
      <EventForm
        bookingData={bookingData}
        selectedDate={selectedDate}
        handleRefresh={handleRefresh}
        setShowSidebar={setShowSidebar}
      />
      {/* <div>{JSON.stringify(bookingData)}</div> */}
      <div className="">
        <CancelButton setShowSidebar={setShowSidebar} />
      </div>
    </div>
  );
}
