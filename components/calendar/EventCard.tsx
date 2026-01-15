import { EventType } from "@/types";
import EventTimeLabel from "./EventTimeLabel";
import { SlidersHorizontal } from "lucide-react";

type EventCardProps = {
  eventInfo: EventType;
  handleEventSelect: (event: any) => void;
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
      className="w-full mx-1 p-1 border-2 rounded-md text-2xl cursor-pointer hover:bg-yellow-300"
    >
      <div className="flex justify-evenly">
        <div className="font-bold">{name}</div>
        <div className="italic  flex justify-between items-center">
          <SlidersHorizontal size={18} strokeWidth={1} />
          <div className="ml-1 text-lg">{producer}</div>
        </div>
      </div>

      <div>
        <EventTimeLabel time={time} />
      </div>
    </div>
  );
}
