'use client';
import { handleFormSubmit } from '@/app/serveractions/handleFormSubmit';
import { useSidebar } from '@/stores/useSidebar';
import { Trash } from 'lucide-react';
import SquareCheck from 'lucide-react';

export default function EventEdit() {
  const bookingOptions = useSidebar((state) => state.bookingOptions);
  const { classNames, producers, times } = bookingOptions;
  const selectedEvent = useSidebar((state) => state.selectedEvent);
  const setSelectedEvent = useSidebar((state) => state.setSelectedEvent);
  const setMode = useSidebar((state) => state.setMode);

  // client function receieving server response
  async function handleClientSubmit(formData: FormData) {
    const result = await handleFormSubmit(formData);

    if (result.success) {
      setMode(null);
    } else {
      console.error('Form submmission failed', result.error);
    }
  }
  return (
    <div className="h-full bg-openlightgreen flex flex-col items-center p-2 rounded-3xl">
      <div className="w-full">
        <div className="text-2xl ">
          {selectedEvent.start?.toLocaleString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
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
          <div className="bg-amber-200">
            <button type="submit">Add</button>
            <button
              onClick={() => {
                setMode(null);
                setSelectedEvent(null);
              }}
            >
              Cancel
            </button>
            <SquareCheck />
            <Trash color="red" size={30} strokeWidth={2.5} />
          </div>
        </form>
      </div>
    </div>
  );
}
