import AddButton from "@/components/new/AddButton";
import CancelButton from "@/components/new/CancelButton";

export default function ShowForm() {
  return (
    <div className="w-full">
      <form>
        <div className="input-container">
          <label className="input-label">Name:</label>
          <input name="title" type="text" className="input" autoFocus />
        </div>

        <div className="input-container">
          <label className="input-label">Class:</label>
          <select name="class-select" id="class-select" className="">
            <option value="">Select class</option>
            <option value="Class1">Class 1</option>
            <option value="Class2">Class 2</option>
          </select>
        </div>

        <div className="input-container">
          <label className="input-label">Producer:</label>
          <select name="producer-select" id="producer-select" className="">
            <option value="">Select producer</option>
            <option value="Producer1">Producer 1</option>
            <option value="Producer2">Producer 2</option>
          </select>
        </div>

        <div className="input-container">
          <label className="input-label">Time:</label>
          <select name="producer-select" id="producer-select" className="">
            <option value="">Select time</option>
            <option value="Daily Mile">Daily Mile</option>
            <option value="Live at Lunch">Live at Lunch</option>
            <option value="After Lunch">After Lunch</option>
          </select>
        </div>

        <div className="input-container">
          <label className="input-label">Topic:</label>
          <textarea name="title" className="input" />
        </div>
      </form>
      <div className="">
        <AddButton />
        <CancelButton />
      </div>
    </div>
  );
}
