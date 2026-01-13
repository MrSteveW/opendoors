"use client";
import ShowForm from "@/components/ShowForm";
import AddButton from "@/components/AddButton";
import CancelButton from "@/components/CancelButton";
import { useFetch } from "./useFetch";

export default function Sidebar({ selectedDate, setShowSidebar }) {
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
      <ShowForm {...bookingData} />
      {/* <div>{JSON.stringify(bookingData)}</div> */}
      <div className="">
        <AddButton />
        <CancelButton setShowSidebar={setShowSidebar} />
      </div>
    </div>
  );
}
