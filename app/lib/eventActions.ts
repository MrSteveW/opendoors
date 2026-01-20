'use server';
import { db } from '@/utils/connect';
import { revalidatePath } from 'next/cache';

type ActionResponse = { success: true } | { success: false; error: string };

export async function handleEventCreate(formData: FormData) {
  try {
    const data = Object.fromEntries(formData);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sendToDb = await db.query(
      `INSERT INTO events (date, name, class_id, producer_id, time_id, topic) VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        data.date,
        data.name,
        data.class_id,
        data.producer_id,
        data.time_id,
        data.topic,
      ],
    );
    revalidatePath('/');
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

export async function handleEventEdit(formData: FormData) {
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
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return {
      success: false,
      error: message,
    };
  }
}

export async function handleEventDelete(id: number) {
  try {
    await db.query('DELETE FROM events WHERE id = $1', [id]);
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
