'use server';

import { db } from '@/utils/connect';
import { revalidatePath } from 'next/cache';

export async function handleFormSubmit(formData: FormData) {
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
    return { success: false, error: error.message };
  }
}
