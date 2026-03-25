'use server';
import { revalidatePath } from 'next/cache';
import { createClerkSupabaseClient } from '@/lib/supabase';
import { EventsDataType } from '@/types';

export async function getEventsData() {
  const supabase = await createClerkSupabaseClient();

  const { data, error } = await supabase
    .from('events')
    .select(
      `
      id,
      date,
      name,
      topic,
      class_id,
      producer_id,
      producers(name),
      times(id, display_order, name, icon)
      `,
    )
    .order('date', { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row) => {
    const producers = row.producers as unknown as { name: string };
    const times = row.times as unknown as {
      id: number;
      display_order: number;
      name: string;
      icon: string;
    };

    return {
      id: row.id,
      date: row.date,
      name: row.name,
      topic: row.topic,
      class_id: row.class_id,
      producer_id: row.producer_id,
      producer: producers.name,
      time_id: times.id,
      order: times.display_order,
      time: times.name,
      icon: times.icon,
    } satisfies EventsDataType;
  });
}

export async function handleEventCreate(formData: FormData) {
  try {
    const supabase = await createClerkSupabaseClient();
    const rawData = Object.fromEntries(formData);

    const { data, error } = await supabase.from('events').insert({
      date: rawData.date,
      name: rawData.name,
      class_id: parseInt(rawData.class_id as string),
      producer_id: parseInt(rawData.producer_id as string),
      time_id: parseInt(rawData.time_id as string),
      topic: rawData.topic,
    });

    if (error) {
      console.error('Supabase error details:', JSON.stringify(error, null, 2));
      throw error;
    }

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : JSON.stringify(error);
    return {
      success: false,
      error: message,
    };
  }
}

export async function handleEventEdit(formData: FormData) {
  try {
    const supabase = await createClerkSupabaseClient();
    const id = formData.get('id');
    const updateData = {
      name: formData.get('name'),
      class_id: parseInt(formData.get('class_id') as string),
      producer_id: parseInt(formData.get('producer_id') as string),
      time_id: parseInt(formData.get('time_id') as string),
      topic: formData.get('topic'),
    };

    // Perform the update
    const { error } = await supabase
      .from('events')
      .update(updateData)
      .eq('id', id); // Matches your WHERE id = $6

    if (error) throw error;

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error('Update Error:', error, message);
    return {
      success: false,
      error: message,
    };
  }
}

export async function handleEventDelete(id: number) {
  try {
    const supabase = await createClerkSupabaseClient();
    const { error } = await supabase.from('events').delete().eq('id', id);

    if (error) throw error;

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error('Delete Error:', message);
    return {
      success: false,
      error: message,
    };
  }
}
