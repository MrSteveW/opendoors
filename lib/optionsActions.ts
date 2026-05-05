'use server';
import { createClerkSupabaseClient } from '@/lib/supabase';

export async function getOptionsData() {
  const supabase = await createClerkSupabaseClient();

  // Execute all three queries in parallel
  const [classesRes, producersRes, timesRes] = await Promise.all([
    supabase
      .from('classes')
      .select('id, name, year_group')
      .is('deleted_at', null)
      .order('year_group', { ascending: true }),

    supabase.from('producers').select('id, name').is('deleted_at', null),

    supabase.from('times').select('id, name').is('deleted_at', null),
  ]);

  if (classesRes.error || producersRes.error || timesRes.error) {
    console.error('Error fetching options:', {
      classes: classesRes.error,
      producers: producersRes.error,
      times: timesRes.error,
    });
    throw new Error('Could not load booking data');
  }

  return {
    classNames: classesRes.data,
    producers: producersRes.data,
    times: timesRes.data,
  };
}
