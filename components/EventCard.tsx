import { EventType } from "@/types";
import EventTimeLabel from "./EventTimeLabel";

export default function EventCard({ eventInfo }: EventType) {
  const { event } = eventInfo;
  const { name, producer, time } = event.extendedProps;

  return (
    <div className="border">
      <div>{name}</div>
      <div>
        <EventTimeLabel time={time} />
      </div>
      <div>{producer}</div>
    </div>
  );
}
