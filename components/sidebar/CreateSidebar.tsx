'use client';
import { handleFormSubmit } from '@/app/serveractions/handleFormSubmit';
import { useSidebar } from '@/stores/useSidebar';

export default function CreateSidebar() {
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
    } else {
      console.error('Form submmission failed', result.error);
    }
  }
  //
  return (
    <div className="h-full bg-openlightgreen flex flex-col items-center p-2 rounded-3xl">
      <div className="w-full">
        <div className="text-2xl ">
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
            value={selectedDate.toISOString().split('T')[0]}
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
          <button
            onClick={() => {
              setMode(null);
              setSelectedDate(null);
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
