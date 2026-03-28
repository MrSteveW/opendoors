import { StatsCount } from '@/types';
import { ChartColumnDecreasing } from 'lucide-react';

interface StatsProps {
  producersCount: StatsCount[];
  classEventsCount: StatsCount[];
}

export default function StatsAdmin({
  producersCount,
  classEventsCount,
}: StatsProps) {
  return (
    <div className="h-[calc(100dvh-80px)] flex flex-col px-1 m-2 bg-white border-purple-500 border-3 rounded-lg  ">
      <div className="flex my-2 text-2xl justify-center items-center">
        <div>Stats</div>
        <div className="mx-3">
          <ChartColumnDecreasing />
        </div>
      </div>

      <div className="flex text-md min-h-0 py-2 gap-4">
        {/* Classes Count */}
        <div className="flex flex-col w-fit m-2 p-3 border-3 border-opengreen rounded-lg ">
          <div className="justify-center font-bold">Events per class</div>
          <div className="divide-y overflow-auto">
            {classEventsCount.map((clss) => (
              <div
                key={clss.id}
                className="grid grid-cols-[3fr_1fr] py-1.5 items-center hover:bg-slate-50 transition-colors "
              >
                <div className="truncate pr-4">{clss.name}</div>
                <div className="truncate pr-4">{clss.event_count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Producers Count */}
        <div className="flex flex-col w-fit m-2 p-3 border-3 border-opengreen rounded-lg ">
          <div className="w-full flex justify-center font-bold">
            Events per producer
          </div>
          <div className="divide-y">
            {producersCount.map((producer) => (
              <div
                key={producer.id}
                className="grid grid-cols-[3fr_1fr] py-1.5 items-center hover:bg-slate-50 transition-colors "
              >
                <div className="truncate pr-4">{producer.name}</div>
                <div className="truncate pr-4">{producer.event_count}</div>
              </div>
            ))}
          </div>
        </div>
        {/* </div>  */}
      </div>
    </div>
  );
}
