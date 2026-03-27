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

      <div className="h-full py-2">
        <div className="flex">
          {/* Classes Count */}
          <div className="p-2 m-4 text-xl  overflow-auto border-3 border-opengreen rounded-lg ">
            <div className="grid grid-cols-2 items-center border-b pb-2 font-bol">
              <div>Class</div>
              <div>Events</div>
              <div></div>
            </div>
            <div className="divide-y">
              {classEventsCount.map((clss) => (
                <div
                  key={clss.id}
                  className="grid grid-cols-2 py-1.5 items-center hover:bg-slate-50 transition-colors "
                >
                  <div className="truncate pr-4">{clss.name}</div>
                  <div className="truncate pr-4">{clss.event_count}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Producers Count */}
          <div className="p-2 m-4 text-xl  overflow-auto border-3 border-opengreen rounded-lg ">
            <div className="grid grid-cols-2 items-center border-b pb-2 font-bol">
              <div>Producer</div>
              <div>Events</div>
              <div></div>
            </div>
            <div className="divide-y">
              {producersCount.map((producer) => (
                <div
                  key={producer.id}
                  className="grid grid-cols-2 py-1.5 items-center hover:bg-slate-50 transition-colors "
                >
                  <div className="truncate pr-4">{producer.name}</div>
                  <div className="truncate pr-4">{producer.event_count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
