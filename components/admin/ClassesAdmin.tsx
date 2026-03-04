'use client';

import { useRouter } from 'next/navigation';
import { DeleteButton } from '../DeleteButton';
import { handleClassCreate } from '@/lib/classActions';
import { handleClassDelete } from '@/lib/classActions';
import { ClassItem } from '@/types';
import { School } from 'lucide-react';
import { Check } from 'lucide-react';

type ClassesAdminProps = {
  classData: ClassItem[];
};

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
    <div className="h-[calc(100dvh-80px)] flex flex-col px-1 m-2 bg-white border-openblue border-3 rounded-lg">
      {/* Title */}
      <div className="flex my-2 text-2xl justify-center items-center">
        <div>Edit classes</div>
        <div className="mx-3">
          <School />
        </div>
      </div>

      {/* Form */}
      <div className="mx-4 p-2 bg-blue-200 text-black rounded-2xl">
        <div className="text-2xl py-2">Add new class</div>
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
            <div className="flex items-center text-2xl">
              <label htmlFor="year_group">Year:</label>
              <select
                name="year_group"
                id="year_group"
                className="ml-3 border-2 border-darkgray px-1"
                required
              >
                <option value="">--</option>
                <option value="R">R</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
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

      {/* Display */}
      <div className="h-full w-1/3 p-2 m-4 text-xl  overflow-auto">
        <div className="grid grid-cols-[3fr_3fr_1fr] items-center border-b pb-2 font-bold">
          <div>Class</div>
          <div>Year</div>
          <div></div>
        </div>
        <div className="divide-y">
          {classData.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[3fr_3fr_1fr] py-1.5 items-center hover:bg-slate-50 transition-colors "
            >
              <div className="truncate pr-4">{item.name}</div>
              <div className="truncate pr-4">{item.year_group}</div>
              <div className="flex justify-end enlarge-button">
                <DeleteButton
                  handleDelete={handleDelete}
                  id={Number(item.id)}
                  size={25}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
