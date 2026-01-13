"use client";
import ShowForm from "@/components/ShowForm";
import AddButton from "@/components/AddButton";
import CancelButton from "@/components/CancelButton";
import { useState, useEffect } from "react";

export default function NewSidebar() {
  const [bookingData, setBookingData] = useState({
    classNames: [],
    producers: [],
    times: [],
  });

  async function getBookingData() {
    try {
      const response = await fetch("/api/data");
      if (!response.ok) {
        console.error("API error:", response.status);
        return;
      }

      const data = await response.json();
      setBookingData(data);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      await getBookingData();
    }
    fetchData();
  }, []);

  return (
    <div className="h-full bg-openlightgreen flex flex-col items-center p-2">
      <div className="text-2xl ">Date: Monday, 12 January 2026</div>
      <ShowForm {...bookingData} />
      {/* <div>{JSON.stringify(bookingData)}</div> */}
      <div className="">
        <AddButton />
        <CancelButton />
      </div>
    </div>
  );
}
