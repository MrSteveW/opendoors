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
      events_producers(producers(id, name)),
      times(id, display_order, name, icon)
      `,
    )
    .order('date', { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row) => {
    const producers = (
      row.events_producers as unknown as {
        producers: { id: number; name: string };
      }[]
    ).map((ep) => ep.producers);
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
      producers,
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

    // Initial data in new event
    const { data: eventData, error: eventError } = await supabase
      .from('events')
      .insert({
        date: rawData.date,
        name: rawData.name,
        class_id: parseInt(rawData.class_id as string),
        time_id: parseInt(rawData.time_id as string),
        topic: rawData.topic,
      })
      .select('id')
      .single();

    if (eventError) {
      console.error(
        'Supabase error details:',
        JSON.stringify(eventError, null, 2),
      );
      throw eventError;
    }

    // 2. Get all checked producer IDs
    const producerIds = formData
      .getAll('producers')
      .map((id) => parseInt(id as string));

    const { error: junctionError } = await supabase
      .from('events_producers')
      .insert(
        producerIds.map((producer_id) => ({
          event_id: eventData.id,
          producer_id,
        })),
      );

    if (junctionError) {
      console.error(
        'Supabase error details:',
        JSON.stringify(junctionError, null, 2),
      );
      throw junctionError;
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
    // Step 1: Update the event
    const { error: updateError } = await supabase
      .from('events')
      .update({
        name: formData.get('name'),
        class_id: parseInt(formData.get('class_id') as string),
        time_id: parseInt(formData.get('time_id') as string),
        topic: formData.get('topic'),
      })
      .eq('id', id);
    if (updateError) throw updateError;

    // Step 2: Delete existing junction rows
    const { error: deleteError } = await supabase
      .from('events_producers')
      .delete()
      .eq('event_id', id);

    if (deleteError) throw deleteError;

    // Step 3: Insert new junction rows
    const producerIds = formData
      .getAll('producers')
      .map((p) => parseInt(p as string));

    const { error: junctionError } = await supabase
      .from('events_producers')
      .insert(
        producerIds.map((producer_id) => ({
          event_id: parseInt(id as string),
          producer_id,
        })),
      );

    if (junctionError) throw junctionError;

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
