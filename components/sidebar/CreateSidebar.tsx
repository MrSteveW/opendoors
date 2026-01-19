'use client';
import { handleEventCreate } from '@/app/lib/eventActions';
import { useSidebar } from '@/stores/useSidebar';
import { SquareCheck } from 'lucide-react';
import { PanelRightClose } from 'lucide-react';

interface CreateSidebarProps {
  onEventChange: () => void;
  eventOptions: any;
}

export default function CreateSidebar({
  onEventChange,
  eventOptions,
}: CreateSidebarProps) {
  const selectedDate = useSidebar((state) => state.selectedDate);
  const setMode = useSidebar((state) => state.setMode);
  const setSelectedDate = useSidebar((state) => state.setSelectedDate);
  const unavailableTimes = useSidebar((state) => state.unavailableTimes);
  const setUnavailableTimes = useSidebar((state) => state.setUnavailableTimes);

  if (!eventOptions) return <div>Loading...</div>;

  const { classNames, producers, times } = eventOptions;

  // client function receieving server response
  async function handleSubmit(formData: FormData) {
    const result = await handleEventCreate(formData);

    if (result.success) {
      setMode(null);
      setUnavailableTimes(null);
      onEventChange();
    } else {
      console.error('Form submmission failed', result.error);
    }
  }
  //
  return (
    <div className="h-full bg-openlightgreen flex flex-col items-center p-2 rounded-3xl">
      <div className="w-full">
        <div className="text-2xl text-center">
          {selectedDate?.toLocaleString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
        <form action={handleSubmit}>
          <input
            type="hidden"
            name="date"
            id="date"
            value={selectedDate?.toISOString().split('T')[0]}
          />

          <div className="input-container">
            <label className="input-label">Name:</label>
            <input
              name="name"
              id="name"
              type="text"
              className="input"
              required
              autoFocus
            />
          </div>

          <div className="input-container">
            <label className="input-label">Class:</label>
            <select name="class_id" id="class_id" required>
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
            <select name="producer_id" id="producer_id" required>
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
            <select name="time_id" id="time_id" required>
              <option value="">Select time</option>
              {times?.map((time) => {
                const isUnavailable = unavailableTimes.some(
                  (un) => un.time_id === time.id,
                );

                return (
                  <option
                    key={time.id}
                    value={time.id}
                    disabled={isUnavailable}
                  >
                    {time.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="input-container">
            <label className="input-label">Topic:</label>
            <textarea name="topic" id="topic" className="input" />
          </div>
          <div className="p-3 flex justify-evenly items-center">
            <button type="submit">
              <SquareCheck color="green" size={50} strokeWidth={2} />
            </button>
            <button
              onClick={() => {
                setMode(null);
                setSelectedDate(null);
                setUnavailableTimes(null);
              }}
            >
              <PanelRightClose color="gray" size={50} strokeWidth={2} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
