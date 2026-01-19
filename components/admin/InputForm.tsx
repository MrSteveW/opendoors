import { Check } from 'lucide-react';

interface Props {
  handleSubmit: (formData: FormData) => void | Promise<void>;
}

export default function InputForm({ handleSubmit }: Props) {
  return (
    <div className="w-full px-2 pb-5 bg-openlightgreen rounded-2xl">
      <div className="text-2xl py-4">Add new</div>
      <form action={handleSubmit}>
        <div className="flex ">
          <div className="flex items-center  w-4/5">
            <label className="text-2xl">Name:</label>
            <input
              name="name"
              type="text"
              className="input"
              autoFocus
              autoComplete="off"
            />
          </div>
          <div className="flex w-2/5  items-center">
            <div className="px-2"></div>
            <div className="px-2">
              <button type="submit">
                <Check color="lightgreen" size={30} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
