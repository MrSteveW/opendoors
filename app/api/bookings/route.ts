import { db } from "@/utils/connect";

export async function GET() {
  const bookings = await db.query(`
    SELECT bookings.id, bookings.date, bookings.date, bookings.name, classes.name AS class, producers.name as producer, times.name AS time, bookings.topic
    FROM bookings
    JOIN classes ON bookings.class_id = classes.id
    JOIN producers ON bookings.producer_id = producers.id
    JOIN times ON bookings.time_id = times.id`);
  return Response.json(bookings.rows);
}
