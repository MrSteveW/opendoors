'use server';
import { createClerkSupabaseClient } from '@/lib/supabase';

export async function getProducersData() {
  const supabase = await createClerkSupabaseClient();

  const { data, error } = await supabase
    .from('producers')
    .select('id, name')
    .is('deleted_at', null);

  if (error) {
    console.error('Error fetching producers:', error.message);
    return [];
  }

  return data;
}

export async function handleProducersCreate(formData: FormData) {
  try {
    const supabase = await createClerkSupabaseClient();
    const { name } = Object.fromEntries(formData);

    const { error } = await supabase
      .from('producers')
      .insert({ name: name as string });

    if (error) throw error;

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

export async function handleProducersDelete(id: number) {
  try {
    const supabase = await createClerkSupabaseClient();

    const { error } = await supabase
      .from('producers')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;

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
