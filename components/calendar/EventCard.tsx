import EventTimeLabel from './EventTimeLabel';
import { SlidersHorizontal } from 'lucide-react';
import { EventApi, EventContentArg } from '@fullcalendar/core';

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
  const { name, producer, time } = event.extendedProps;

  return (
    <div
      onClick={handleClick}
      className="w-full m-1.5 px-3 border-2 border-black rounded-md cursor-pointer bg-white hover:bg-orange-500"
    >
      <div className="flex">
        <div className="font-bold text-xl mr-2">{name}</div>
       
        <div className="flex italic items-center">
           <SlidersHorizontal size={18} strokeWidth={1} />
           <div className="ml-2 text-lg">{producer}</div>
        </div>
      </div>

      <div className="text-xl">
        <EventTimeLabel time={time} />
      </div>
    </div>
  );
}
