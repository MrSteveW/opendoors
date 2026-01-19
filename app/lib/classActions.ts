'use server';
import { db } from '@/utils/connect';

export async function getClassesData() {
  const classData = await db.query(
    `SELECT * FROM classes WHERE deleted_at IS NULL`,
  );
  return classData.rows;
}

export async function handleClassDelete(id: number) {
  try {
    await db.query(`UPDATE classes SET deleted_at = NOW() WHERE id = $1`, [id]);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
