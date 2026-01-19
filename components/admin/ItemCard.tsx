import { X } from 'lucide-react';

export default function ItemCard({ item, handleDelete }) {
  return (
    <div className="w-60 flex flex-row bg-white p-2 mx-2 my-1 text-xl justify-between border-openblue border-3 rounded-lg">
      <div>{item.name}</div>
      <div className="flex ">
        <button onClick={() => handleDelete(item.id)}>
          <X color="red" size={30} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
