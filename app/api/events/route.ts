import { db } from '@/utils/connect';

export const dynamic = 'force-dynamic';

export async function GET() {
  const events = await db.query(`
    SELECT events.id, events.date, events.date, events.name, classes.id as class_id, producers.id as producer_id, producers.name as producer, times.id as time_id, times.order AS order, times.name AS time, events.topic
    FROM events
    JOIN classes ON events.class_id = classes.id
    JOIN producers ON events.producer_id = producers.id
    JOIN times ON events.time_id = times.id
    ORDER BY events.date ASC`);
  return Response.json(events.rows);
}
