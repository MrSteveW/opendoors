import { db } from "@/utils/connect";

export async function GET() {
  const bookings = await db.query(`SELECT * FROM bookings`);
  return Response.json(bookings.rows);
}
