'use server';
import { db } from '@/utils/connect';
import { revalidatePath } from 'next/cache';

export async function handleEditSubmit(formData: FormData) {
  try {
    const id = formData.get('id');
    const name = formData.get('name');
    const class_id = formData.get('class_id');
    const producer_id = formData.get('producer_id');
    const time_id = formData.get('time_id');
    const topic = formData.get('topic');

    await db.query(
      `UPDATE events
       SET name = $1,
           class_id = $2,
           producer_id = $3,
           time_id = $4,
           topic = $5
       WHERE id = $6`,
      [name, class_id, producer_id, time_id, topic, id],
    );
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
