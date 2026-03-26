import EventTimeLabel from './EventTimeLabel';
import { SlidersHorizontal } from 'lucide-react';
import { EventApi, EventContentArg } from '@fullcalendar/core';

interface Producer {
  id: number;
  name: string;
}

type EventCardProps = {
  eventInfo: EventContentArg;
  handleEventSelect: (event: EventApi) => void;
};

export default function EventCard({
  eventInfo,
  handleEventSelect,
}: EventCardProps) {
  //
  function handleClick() {
    handleEventSelect(eventInfo.event);
  }

  const { event } = eventInfo;
  const { name, producers, time, icon, order } = event.extendedProps;

  return (
    <div
      onClick={handleClick}
      className="mx-1 px-3 border-2 text-xl border-black rounded-md cursor-pointer bg-white hover:bg-orange-500"
    >
      <div className="flex px-0.5">
        <div className="font-bold">{name}</div>
      </div>
      <div className="flex items-center px-0.5">
        <SlidersHorizontal size={18} strokeWidth={1} />
        <div className="ml-2 italic flex flex-row">
          {producers.map((producer: Producer) => {
            return (
              <div key={producer.id} className="mx-1">
                {producer.name}
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-0.5">
        <EventTimeLabel time={time} icon={icon} order={order} />
      </div>
    </div>
  );
}
