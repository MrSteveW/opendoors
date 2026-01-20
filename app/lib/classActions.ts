'use server';
import { db } from '@/utils/connect';

type ActionResponse = { success: true } | { success: false; error: string };

export async function getClassesData() {
  const classData = await db.query(
    `SELECT id, name FROM classes WHERE deleted_at IS NULL`,
  );
  return classData.rows;
}

export async function handleClassCreate(
  formData: FormData,
): Promise<ActionResponse> {
  try {
    const data = Object.fromEntries(formData);
    const sendToDb = await db.query(`INSERT INTO classes (name) VALUES ($1)`, [
      data.name,
    ]);
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
