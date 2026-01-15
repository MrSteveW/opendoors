"use client";
import { FormOptionsType } from "@/types";
import { handleFormSubmit } from "@/app/serveractions/handleFormSubmit";
import { SelectedEventType } from "@/types";

type EventEditProps = {
  bookingOptions: FormOptionsType;
  selectedEvent: SelectedEventType;
  handleRefresh: () => void;
  setShowSidebar: (show: boolean) => void;
};

//
export default function EventEdit({
  bookingOptions,
  selectedEvent,
  handleRefresh,
  setShowSidebar,
}: EventEditProps) {
  const { classNames, producers, times } = bookingOptions;

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
      <div className="text-2xl ">
        {selectedEvent.start?.toLocaleString("en-GB", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
      <form action={handleClientSubmit}>
        {/* <div>{selectedEvent.start}</div> */}

        <div className="input-container">
          <label className="input-label">Name:</label>
          <input
            name="name"
            id="name"
            type="text"
            className="input"
            defaultValue={selectedEvent.title}
          />
        </div>

        <div className="input-container">
          <label className="input-label">Class:</label>
          <select
            name="class_id"
            id="class_id"
            defaultValue={selectedEvent.extendedProps.class_id}
          >
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
          <select
            name="producer_id"
            id="producer_id"
            defaultValue={selectedEvent.extendedProps.producer_id}
          >
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
          <select
            name="time_id"
            id="time_id"
            defaultValue={selectedEvent.extendedProps.time_id}
          >
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
          <textarea
            name="topic"
            id="topic"
            className="input"
            defaultValue={selectedEvent.extendedProps.topic}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
