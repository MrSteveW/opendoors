import { FormType } from "@/types";

export default function ShowForm({ classNames, producers, times }: FormType) {
  return (
    <div className="w-full">
      <form>
        <div className="input-container">
          <label className="input-label">Name:</label>
          <input name="title" type="text" className="input" autoFocus />
        </div>

        <div className="input-container">
          <label className="input-label">Class:</label>
          <select name="class_id" id="class_id">
            <option value="">Select class</option>
            {classNames.map((className) => (
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
            {producers.map((producer) => (
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
            {times.map((time) => (
              <option key={time.id} value={time.id}>
                {time.name}
              </option>
            ))}
          </select>
        </div>

        <div className="input-container">
          <label className="input-label">Topic:</label>
          <textarea name="topic" className="input" />
        </div>
      </form>
    </div>
  );
}
