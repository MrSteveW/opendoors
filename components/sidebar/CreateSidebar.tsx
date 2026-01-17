'use client';
import { handleFormSubmit } from '@/app/lib/handleFormSubmit';
import { useSidebar } from '@/stores/useSidebar';
import { SquareCheck } from 'lucide-react';
import { PanelRightClose } from 'lucide-react';

interface CreateSidebarProps {
  onEventChange: () => void;
}

export default function CreateSidebar({ onEventChange }: CreateSidebarProps) {
  const selectedDate = useSidebar((state) => state.selectedDate);
  const setMode = useSidebar((state) => state.setMode);
  const setSelectedDate = useSidebar((state) => state.setSelectedDate);
  const bookingOptions = useSidebar((state) => state.bookingOptions);
  const loading = useSidebar((state) => state.bookingOptionsLoading);

  if (loading || !bookingOptions) return <div>Loading...</div>;

  // const { data: bookingOptions, loading } = bookingOptions;
  // //   if (loading) return;
  // if (!bookingOptions) return <div>Loading...</div>;
  const { classNames, producers, times } = bookingOptions;

  // client function receieving server response
  async function handleClientSubmit(formData: FormData) {
    const result = await handleFormSubmit(formData);

    if (result.success) {
      setMode(null);
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
        <form action={handleClientSubmit}>
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
              {times?.map((time) => (
                <option key={time.id} value={time.id}>
                  {time.name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-container">
            <label className="input-label">Topic:</label>
            <textarea name="topic" id="topic" className="input" required />
          </div>
          <div className="p-3 flex justify-evenly items-center">
            <button type="submit">
              {' '}
              <SquareCheck color="green" size={50} strokeWidth={2} />
            </button>
            <button
              onClick={() => {
                setMode(null);
                setSelectedDate(null);
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
