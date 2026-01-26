'use server';
import { db } from '@/utils/connect';

type ActionResponse = { success: true } | { success: false; error: string };

export async function getClassesData() {
  const classData = await db.query(
    `SELECT id, name, year_group FROM classes WHERE deleted_at IS NULL ORDER BY year_group ASC`,
  );
  return classData.rows;
}

export async function handleClassCreate(
  formData: FormData,
): Promise<ActionResponse> {
  try {
    const data = Object.fromEntries(formData);
    const sendToDb = await db.query(
      `INSERT INTO classes (name, year_group) VALUES ($1, $2)`,
      [data.name, data.year_group],
    );
    return { success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return {
      success: false,
      error: message,
    };
  }
}

export async function handleClassDelete(id: number) {
  try {
    await db.query(`UPDATE classes SET deleted_at = NOW() WHERE id = $1`, [id]);
    return { success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return {
      success: false,
      error: message,
    };
  }
}
