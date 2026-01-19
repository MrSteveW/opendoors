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
      className="w-full mx-1 p-1 border-2 rounded-md cursor-pointer hover:bg-orange-500"
    >
      <div className="flex justify-evenly">
        <div className="font-bold text-xl">{name}</div>
        <div className="italic  flex justify-between items-center">
          <SlidersHorizontal size={18} strokeWidth={1} />
          <div className="ml-1 text-lg">{producer}</div>
        </div>
      </div>

      <div className="text-2xl">
        <EventTimeLabel time={time} />
      </div>
    </div>
  );
}
