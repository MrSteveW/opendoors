'use client';
import { useSidebar } from '@/stores/useSidebar';
import { PanelRightClose } from 'lucide-react';

type ViewSidebarProps = {
  eventOptions: any;
};

export default function ViewSidebar({ eventOptions }: ViewSidebarProps) {
  const selectedEvent = useSidebar((state) => state.selectedEvent);
  const setSelectedEvent = useSidebar((state) => state.setSelectedEvent);
  const setMode = useSidebar((state) => state.setMode);

  return (
    <div className="h-full bg-openlightgreen flex flex-col items-center p-2 rounded-3xl">
      <div className="w-full">
        <div className="text-2xl text-center">
          {selectedEvent?.start?.toLocaleString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
        <div className="input-container">
          <label className="input-label">Name:</label>
          <input
            className="input"
            defaultValue={selectedEvent?.title}
            readOnly
          />
        </div>

        <div className="input-container">
          <label className="input-label">Class:</label>
          <input
            className="input"
            defaultValue={selectedEvent?.extendedProps.class_id}
            readOnly
          ></input>
        </div>

        <div className="input-container">
          <label className="input-label">Producer:</label>
          <input
            className="input"
            defaultValue={selectedEvent?.extendedProps.producer_id}
            readOnly
          ></input>
        </div>

        <div className="input-container">
          <label className="input-label">Time:</label>
          <input
            className="input"
            defaultValue={selectedEvent?.extendedProps.time_id}
            readOnly
          ></input>
        </div>

        <div className="input-container">
          <label className="input-label">Topic:</label>
          <input
            className="input"
            defaultValue={selectedEvent?.extendedProps.topic}
            readOnly
          />
        </div>
        <div className="p-3 flex justify-evenly items-center">
          <button
            onClick={() => {
              setMode(null);
              setSelectedEvent(null);
            }}
          >
            <PanelRightClose color="gray" size={50} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
