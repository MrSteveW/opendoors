'use server';
import { createClerkSupabaseClient } from '@/lib/supabase';

export async function getIconsData() {
  const supabase = await createClerkSupabaseClient();

  const { data, error } = await supabase
    .from('icons')
    .select('name')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching icons:', error.message);
    return [];
  }

  return data;
}
