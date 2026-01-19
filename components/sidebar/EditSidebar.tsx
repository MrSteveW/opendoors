'use client';
import { handleEditSubmit as updateEventServerAction } from '@/app/lib/actions';
import { handleDelete as deleteServerAction } from '@/app/lib/actions';
import { useSidebar } from '@/stores/useSidebar';
import { Trash } from 'lucide-react';
import { SquareCheck } from 'lucide-react';
import { PanelRightClose } from 'lucide-react';

interface EditSidebarProps {
  onEventChange: () => void;
  eventOptions: any;
}

export default function EventEdit({
  onEventChange,
  eventOptions,
}: EditSidebarProps) {
  const { classNames, producers, times } = eventOptions;
  const selectedEvent = useSidebar((state) => state.selectedEvent);
  const setSelectedEvent = useSidebar((state) => state.setSelectedEvent);
  const setMode = useSidebar((state) => state.setMode);

  async function handleEditSubmit(formData: FormData) {
    const result = await updateEventServerAction(formData);

    if (result.success) {
      setMode(null);
      onEventChange();
    } else {
      console.error('Update failed', result.error);
    }
  }

  async function handleDelete(id: number) {
    const result = await deleteServerAction(id);
    if (result.success) {
      setMode(null);
      setSelectedEvent(null);
      onEventChange();
    } else {
      console.error('Update failed', result.error);
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
        <form action={handleEditSubmit}>
          <input
            name="id"
            id="id"
            type="hidden"
            defaultValue={selectedEvent?.id}
          />

          <div className="input-container">
            <label className="input-label">Name:</label>
            <input
              name="name"
              id="name"
              type="text"
              className="input"
              defaultValue={selectedEvent?.title}
            />
          </div>

          <div className="input-container">
            <label className="input-label">Class:</label>
            <select
              name="class_id"
              id="class_id"
              defaultValue={selectedEvent?.extendedProps.class_id}
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
          <div className="p-3 flex justify-evenly items-center">
            <button type="submit">
              <SquareCheck color="green" size={50} strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => {
                setMode(null);
                setSelectedEvent(null);
              }}
            >
              <PanelRightClose color="gray" size={50} strokeWidth={2} />
            </button>

            <Trash
              onClick={() => handleDelete(Number(selectedEvent?.id))}
              color="red"
              size={50}
              strokeWidth={2}
              className="cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
