/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { createClerkSupabaseClient } from '@/lib/supabase';

export async function getTimesData() {
  const supabase = await createClerkSupabaseClient();

  const { data, error } = await supabase
    .from('times')
    .select('id, name, display_order, icon')
    .is('deleted_at', null)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching times:', error.message);
    return [];
  }

  return data;
}

export async function handleTimesCreate(formData: FormData) {
  try {
    const supabase = await createClerkSupabaseClient();

    const name = formData.get('name') as string;
    const orderRaw = formData.get('display_order') as string;
    const display_order = parseInt(orderRaw, 10);
    const icon = formData.get('icon') as string;

    if (isNaN(display_order)) {
      throw new Error('Invalid order value');
    }

    const { error } = await supabase
      .from('times')
      .insert({ name, display_order, icon });

    if (error) throw error;

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
    };
  }
}

export async function handleTimesDelete(id: number) {
  try {
    const supabase = await createClerkSupabaseClient();

    const { error } = await supabase
      .from('times')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
    };
  }
}
