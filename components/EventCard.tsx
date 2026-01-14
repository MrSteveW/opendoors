import { EventType } from "@/types";
import EventTimeLabel from "./EventTimeLabel";

type EventCardProps = {
  eventInfo: EventType;
  setSelectedEvent: (event: any) => void;
};

export default function EventCard({
  eventInfo,
  setSelectedEvent,
}: EventCardProps) {
  //
  function handleClick() {
    setSelectedEvent(eventInfo.event);
  }

  const { event } = eventInfo;
  const { name, producer, time } = event.extendedProps;

  return (
    <div
      onClick={handleClick}
      className="w-full mx-1 p-1 border rounded-md text-lg cursor-pointer hover:bg-yellow-300"
    >
      <div className="flex">
        <div>{name}</div>
        <div>{producer}</div>
      </div>

      <div>
        <EventTimeLabel time={time} />
      </div>
    </div>
  );
}
