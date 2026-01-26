import { db } from '@/utils/connect';

export async function getOptionsData() {
  const [classNames, producers, times] = await Promise.all([
    db.query(
      `SELECT id, name, year_group FROM classes WHERE deleted_at IS NULL ORDER BY year_group ASC`,
    ),
    db.query(`SELECT id, name FROM producers WHERE deleted_at IS NULL`),
    db.query(`SELECT id, name FROM times WHERE deleted_at IS NULL`),
  ]);
  const bookingData = {
    classNames: classNames.rows,
    producers: producers.rows,
    times: times.rows,
  };
  return bookingData;
}
