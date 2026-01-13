export default function EventCard({ eventInfo }) {
  const { event } = eventInfo;
  const { name, producer_id, time_id, topic } = event.extendedProps;

  return (
    <div className="border-1">
      <p>{name}</p>
      <p>Producer: {producer_id}</p>
      <p>Time: {time_id}</p>
      <p>{topic}</p>
    </div>
  );
}
