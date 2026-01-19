import { db } from '@/utils/connect';

export async function getOptionsData() {
  const [classNames, producers, times] = await Promise.all([
    db.query(`SELECT * FROM classes WHERE deleted_at IS NULL`),
    db.query(`SELECT * FROM producers WHERE deleted_at IS NULL`),
    db.query(`SELECT * FROM times WHERE deleted_at IS NULL`),
  ]);
  const bookingData = {
    classNames: classNames.rows,
    producers: producers.rows,
    times: times.rows,
  };
  return bookingData;
}
