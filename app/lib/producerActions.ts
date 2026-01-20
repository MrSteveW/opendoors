'use server';
import { db } from '@/utils/connect';

export async function getProducersData() {
  const producersData = await db.query(
    `SELECT * FROM producers WHERE deleted_at IS NULL`,
  );
  return producersData.rows;
}

export async function handleProducersCreate(formData: FormData) {
  try {
    const data = Object.fromEntries(formData);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sendToDb = await db.query(
      `INSERT INTO producers (name) VALUES ($1)`,
      [data.name],
    );
    return { success: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return {
      success: false,
      error: message,
    };
  }
}

export async function handleProducersDelete(id: number) {
  try {
    await db.query(`UPDATE producers SET deleted_at = NOW() WHERE id = $1`, [
      id,
    ]);
    return { success: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return {
      success: false,
      error: message,
    };
  }
}
