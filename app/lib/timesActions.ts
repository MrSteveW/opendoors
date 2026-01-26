'use server';
import { db } from '@/utils/connect';

export async function getTimesData() {
  const timesData = await db.query(
    `SELECT id, name, display_order FROM times WHERE deleted_at IS NULL`,
  );
  return timesData.rows;
}

export async function handleTimesCreate(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const orderRaw = formData.get('display_order') as string;

    // Convert to integer (base 10)
    const display_order = parseInt(orderRaw, 10);

    // Validate the conversion
    if (isNaN(display_order)) {
      throw new Error('Invalid order value');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sendToDb = await db.query(
      `INSERT INTO times (name, display_order) VALUES ($1, $2)`,
      [name, display_order],
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

export async function handleTimesDelete(id: number) {
  try {
    await db.query(`UPDATE times SET deleted_at = NOW() WHERE id = $1`, [id]);
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
