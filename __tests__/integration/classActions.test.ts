import { beforeEach, afterEach, beforeAll, it, expect, vi } from 'vitest';
import {
  getClassesData,
  handleClassCreate,
  handleClassDelete,
} from '@/lib/classActions';
import { createClerkSupabaseClient } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';

vi.mock('@/lib/supabase');

const adminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

beforeAll(() => {
  vi.mocked(createClerkSupabaseClient).mockImplementation(
    async () => adminClient,
  );
});

beforeEach(async () => {
  await adminClient.from('classes').delete().eq('name', 'Vitest Class');
});

afterEach(async () => {
  await adminClient.from('classes').delete().eq('name', 'Vitest Class');
});

it('getClassesData returns active classes', async () => {
  const { data: inserted } = await adminClient
    .from('classes')
    .insert({ name: 'Vitest Class' })
    .select()
    .single();

  const result = await getClassesData();

  expect(result.find((c) => c.id === inserted!.id)).toBeDefined();
});

it('getClassesData excludes soft-deleted classes', async () => {
  const { data: inserted } = await adminClient
    .from('classes')
    .insert({ name: 'Vitest Class', year_group: '3' })
    .select()
    .single();

  await adminClient
    .from('classes')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', inserted!.id);

  const result = await getClassesData();

  expect(result.find((c) => c.id === inserted!.id)).toBeUndefined();
});

it('admin can create a class', async () => {
  const formData = new FormData();
  formData.append('name', 'Vitest Class');
  formData.append('year_group', '3');

  const result = await handleClassCreate(formData);

  expect(result.success).toBe(true);

  const { data } = await adminClient
    .from('classes')
    .select()
    .eq('id', result.data!.id)
    .is('deleted_at', null)
    .single();

  expect(data!.name).toBe('Vitest Class');
});

it('admin can softDelete a class', async () => {
  const { data: inserted } = await adminClient
    .from('classes')
    .insert({ name: 'Vitest Class', year_group: '3' })
    .select()
    .single();

  const result = await handleClassDelete(inserted!.id);

  expect(result.success).toBe(true);
});
