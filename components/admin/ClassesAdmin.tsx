'use client';

import { useRouter } from 'next/navigation';
import ItemCard from './ItemCard';
import InputForm from './InputForm';
import { handleClassCreate } from '@/app/lib/classActions';
import { handleClassDelete } from '@/app/lib/classActions';
import { ClassesAdminProps } from '@/types';

export default function ClassesAdmin({ classData }: ClassesAdminProps) {
  const router = useRouter();

  async function handleDelete(id: number) {
    const result = await handleClassDelete(id);
    if (result.success) {
      router.refresh();
    } else {
      console.error('Delete failed', result.error);
    }
  }

  async function handleSubmit(formData: FormData) {
    const result = await handleClassCreate(formData);
    if (result.success) {
      router.refresh();
    } else {
      console.error('Submit failed', result.error);
    }
  }

  return (
    <div className="h-9/10 flex flex-col px-4 m-2 border-openblue border-3 rounded-lg">
      <div className="h-7/10 py-3">
        <div className="text-3xl text-center ">Edit classes</div>
        <div className="flex flex-wrap ">
          {classData.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              handleDelete={() => handleDelete(item.id)}
            />
          ))}
        </div>
      </div>

      <div className="h-4/10 ">
        <InputForm handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}
