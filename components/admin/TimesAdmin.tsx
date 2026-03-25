'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DeleteButton } from '../DeleteButton';
import { handleTimesCreate } from '@/lib/timesActions';
import { handleTimesDelete } from '@/lib/timesActions';
import { TimesItem } from '@/types';
import { IconsItem } from '@/types';
import { Clock } from 'lucide-react';
import { Check } from 'lucide-react';
import IconDialog from '@/components/IconDialog';
import * as Icons from 'lucide-react';
import { Music } from 'lucide-react';

type TimesAdminProps = {
  timesData: TimesItem[];
  iconsData: IconsItem[];
};

export default function TimesAdmin({ timesData, iconsData }: TimesAdminProps) {
  const [iconDialogOpen, setIconDialogOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('');
  const CurrentIconSelection =
    (Icons[selectedIcon as keyof typeof Icons] as React.ElementType) ?? Music;

  function selectIcon(icon: string) {
    setSelectedIcon(icon);
    setIconDialogOpen(false);
  }

  const router = useRouter();

  async function handleDelete(id: number) {
    const result = await handleTimesDelete(id);
    if (result.success) {
      router.refresh();
    } else {
      console.error('Delete failed', result.error);
    }
  }

  async function handleSubmit(formData: FormData) {
    const result = await handleTimesCreate(formData);
    if (result.success) {
      router.refresh();
    } else {
      console.error('Submit failed', result.error);
    }
  }

  return (
    <div className="h-[calc(100dvh-80px)] flex flex-col px-1 m-2 bg-white border-openyellow border-3 rounded-lg">
      <div className="flex my-2 text-2xl justify-center items-center">
        <div>Edit times</div>
        <div className="mx-3">
          <Clock />
        </div>
      </div>

      {/* Form */}
      <div className="mx-4 p-2 bg-blue-200 text-black rounded-2xl">
        <div className="text-2xl py-2">Add new event time</div>
        <form action={handleSubmit}>
          <div className="flex">
            <div className="flex items-center text-2xl">
              <input
                hidden
                name="icon"
                type="text"
                value={selectedIcon}
                readOnly
              />

              <label htmlFor="name">Time:</label>
              <input
                id="name"
                name="name"
                type="text"
                className="p-1 m-3 bg-white"
                autoFocus
                autoComplete="off"
                required
              />
            </div>

            <div className="flex items-center text-2xl">
              <label htmlFor="display_order">Display order:</label>
              <select
                name="display_order"
                id="display_order"
                className="ml-3 border-2 border-darkgray px-1"
              >
                <option value="">--</option>
                <option value="1">1st</option>
                <option value="2">2nd</option>
                <option value="3">3rd</option>
                <option value="4">4th</option>
                <option value="5">5th</option>
              </select>
            </div>

            <div className="flex items-center text-2xl px-5">
              <IconDialog iconsData={iconsData} selectIcon={selectIcon} />
              <div className="pl-4">
                <CurrentIconSelection />
              </div>
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
        <div className="grid grid-cols-[3fr_2fr_2fr_1fr] items-center border-b pb-2 font-bold">
          <div>Time</div>
          <div>Display order</div>
          <div>Icon</div>
          <div></div>
        </div>
        <div className="divide-y">
          {timesData.map((item) => {
            const IconComponent =
              (Icons[item.icon as keyof typeof Icons] as React.ElementType) ??
              Music;
            return (
              <div
                key={item.id}
                className="grid grid-cols-[3fr_2fr_2fr_1fr] py-1.5 items-center hover:bg-slate-50 transition-colors "
              >
                <div className="truncate pr-4">{item.name}</div>
                <div className="truncate pr-4">{item.display_order}</div>
                <div className="truncate pr-4">
                  <IconComponent />
                </div>
                <div className="flex justify-end enlarge-button">
                  <DeleteButton
                    handleDelete={handleDelete}
                    id={Number(item.id)}
                    size={25}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
