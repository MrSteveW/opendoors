'use client';

import { useRouter } from 'next/navigation';
import ItemCard from './ItemCard';
import InputForm from './InputForm';
import { handleProducersCreate } from '@/app/lib/producerActions';
import { handleProducersDelete } from '@/app/lib/producerActions';

export default function ProducersAdmin({ producersData }) {
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
    <div className="h-9/10 flex flex-col px-4 m-2 border-opengreen border-3 rounded-lg  ">
      <div className="h-7/10 py-3">
        <div className="text-3xl text-center ">Edit producers</div>
        <div className=" flex flex-wrap columns-3">
          {producersData.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              handleDelete={() => handleDelete(item.id)}
            />
          ))}
        </div>
      </div>

      <div className="h-4/10">
        <InputForm handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}
