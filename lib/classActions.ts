'use server';
import { createClerkSupabaseClient } from '@/lib/supabase';

type ActionResponse = {
  success: boolean;
  error?: string;
  data?: { id: number };
};

export async function getClassesData() {
  const supabase = await createClerkSupabaseClient();

  const { data, error } = await supabase
    .from('classes')
    .select('id, name, year_group')
    .is('deleted_at', null)
    .order('year_group', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

export async function handleClassCreate(
  formData: FormData,
): Promise<ActionResponse> {
  try {
    const supabase = await createClerkSupabaseClient();
    const { name, year_group } = Object.fromEntries(formData);

    const { data, error } = await supabase
      .from('classes')
      .insert({ name, year_group })
      .select('id')
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return { success: false, error: message };
  }
}

export async function handleClassDelete(id: number) {
  try {
    const supabase = await createClerkSupabaseClient();

    const { error } = await supabase
      .from('classes')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return { success: false, error: message };
  }
}
