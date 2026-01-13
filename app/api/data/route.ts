import { db } from "@/utils/connect";

export async function GET() {
  const [classNames, producers, times] = await Promise.all([
    db.query(`SELECT * FROM classes`),
    db.query(`SELECT * FROM producers`),
    db.query(`SELECT * FROM times`),
  ]);
  const bookingData = {
    classNames: classNames.rows,
    producers: producers.rows,
    times: times.rows,
  };
  return Response.json(bookingData);
}
