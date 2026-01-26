'use client';

import { useRouter } from 'next/navigation';
import ItemCard from './ItemCard';
import { handleProducersCreate } from '@/app/lib/producerActions';
import { handleProducersDelete } from '@/app/lib/producerActions';
import { ProducerItem } from '@/types';
import { BookHeadphones } from 'lucide-react';
import { Check } from 'lucide-react';

type ProducersAdminProps = {
  producersData: ProducerItem[];
};

export default function ProducersAdmin({ producersData }: ProducersAdminProps) {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const result = await handleProducersCreate(formData);
    if (result.success) {
      router.refresh();
    } else {
      console.error('Submit failed', result.error);
    }
  }

  async function handleDelete(id: number) {
    const result = await handleProducersDelete(id);
    if (result.success) {
      router.refresh();
    } else {
      console.error('Delete failed', result.error);
    }
  }

  return (
    <div className="h-[calc(100dvh-80px)] flex flex-col px-1 m-2 bg-white border-opengreen border-3 rounded-lg  ">
      <div className="flex my-2 text-2xl justify-center items-center">
        <div>Edit producers</div>
        <div className="mx-3">
          <BookHeadphones />
        </div>
      </div>

      {/* Form */}
      <div className="mx-4 p-2 bg-blue-200 text-black rounded-2xl">
        <div className="text-2xl py-2">Add new producer</div>
        <form action={handleSubmit}>
          <div className="flex">
            <div className="flex items-center text-2xl">
              <label className="">Name:</label>
              <input
                name="name"
                type="text"
                className="p-1 m-3 bg-white"
                autoFocus
                autoComplete="off"
              />
            </div>
            <div className="flex w-2/5  items-center">
              <div className="px-2"></div>
              <div className="px-2">
                <button type="submit" className="enlarge-button">
                  <Check color="green" size={30} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="h-full py-2">
        <div className="flex flex-wrap">
          {producersData.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              handleDelete={() => handleDelete(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
