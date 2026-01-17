import { db } from '@/utils/connect';

export const dynamic = 'force-dynamic';

export async function GET() {
  const bookings = await db.query(`
    SELECT bookings.id, bookings.date, bookings.date, bookings.name, classes.id as class_id, producers.id as producer_id, producers.name as producer, times.id as time_id, times.order AS order, times.name AS time, bookings.topic
    FROM bookings
    JOIN classes ON bookings.class_id = classes.id
    JOIN producers ON bookings.producer_id = producers.id
    JOIN times ON bookings.time_id = times.id`);
  return Response.json(bookings.rows);
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await db.query('DELETE FROM bookings WHERE id = $1', [id]);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Error deleting event' }, { status: 500 });
  }
}
