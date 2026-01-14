"use client";
import { FormOptionsType } from "@/types";
import { handleFormSubmit } from "@/app/serveractions/handleFormSubmit";

//
export default function EventForm({
  selectedEvent,
  handleRefresh,
  setShowSidebar,
}: {
  bookingData: FormOptionsType;
  selectedDate: Date;
  handleRefresh: () => void;
  setShowSidebar: (show: boolean) => void;
}) {
  const { classNames, producers, times } = bookingData;

  // client function receieving server response
  async function handleClientSubmit(formData: FormData) {
    const result = await handleFormSubmit(formData);

    if (result.success) {
      handleRefresh();
      setShowSidebar(false);
    } else {
      console.error("Form submmission failed", result.error);
    }
  }
  return (
    <div className="w-full">
      <form action={handleClientSubmit}>
        <input
          type="hidden"
          name="date"
          id="date"
          value={selectedDate.toISOString().split("T")[0]}
        />

        <div className="input-container">
          <label className="input-label">Name:</label>
          <input
            name="name"
            id="name"
            type="text"
            className="input"
            autoFocus
          />
        </div>

        <div className="input-container">
          <label className="input-label">Class:</label>
          <select name="class_id" id="class_id">
            <option value="">Select class</option>
            {classNames?.map((className) => (
              <option key={className.id} value={className.id}>
                {className.name}
              </option>
            ))}
          </select>
        </div>

        <div className="input-container">
          <label className="input-label">Producer:</label>
          <select name="producer_id" id="producer_id" className="">
            <option value="">Select producer</option>
            {producers?.map((producer) => (
              <option key={producer.id} value={producer.id}>
                {producer.name}
              </option>
            ))}
          </select>
        </div>

        <div className="input-container">
          <label className="input-label">Time:</label>
          <select name="time_id" id="time_id" className="">
            <option value="">Select time</option>
            {times?.map((time) => (
              <option key={time.id} value={time.id}>
                {time.name}
              </option>
            ))}
          </select>
        </div>

        <div className="input-container">
          <label className="input-label">Topic:</label>
          <textarea name="topic" id="topic" className="input" />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
