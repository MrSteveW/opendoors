'use server';
import { createClerkSupabaseClient } from '@/lib/supabase';

export async function getClassEventCount() {
  const supabase = await createClerkSupabaseClient();
  const { data, error } = await supabase
    .from('classes')
    .select(
      `
    id,
    name,
    year_group,
    events(count)
    `,
    )
    .order('year_group');

  if (error) {
    throw new Error(`Failed to fetch class event counts: ${error.message}`);
  }

  return (data ?? []).map((clss) => ({
    id: clss.id,
    name: clss.name,
    event_count: (clss.events as unknown as { count: number }[])[0]?.count ?? 0,
  }));
}

export async function getProducerEventCounts() {
  const supabase = await createClerkSupabaseClient();
  const { data, error } = await supabase
    .from('producers')
    .select(
      `id,
    name,
    events_producers(count)
    `,
    )
    .is('deleted_at', null);

  if (error) {
    throw new Error(`Failed to fetch producer event counts: ${error.message}`);
  }

  return (data ?? [])
    .map((producer) => ({
      id: producer.id,
      name: producer.name,
      event_count: producer.events_producers[0]?.count ?? 0,
    }))
    .sort((a, b) => b.event_count - a.event_count);
}
