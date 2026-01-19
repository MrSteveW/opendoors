'use client';

import { useRouter } from 'next/navigation';
import ItemCard from './ItemCard';
import InputForm from './InputForm';
import { handleClassDelete } from '@/app/lib/classActions';

export default function ClassesAdmin({ classData }) {
  const router = useRouter();

  async function handleDelete(id: number) {
    const result = await handleClassDelete(id);
    if (result.success) {
      router.refresh();
    } else {
      console.error('Delete failed', result.error);
    }
  }

  return (
    <div className="h-full p-4 border-openblue border-3 rounded-lg m-4 -mb-20">
      <div className="text-3xl text-center py-5">Edit classes</div>
      <div>
        {classData.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            handleDelete={() => handleDelete(item.id)}
          />
        ))}
      </div>
      <div className="py-5">
        <InputForm />
      </div>
    </div>
  );
}
