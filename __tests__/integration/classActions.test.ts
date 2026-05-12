import { beforeEach, afterEach, beforeAll, it, expect, vi } from 'vitest';
import { handleClassCreate, handleClassDelete } from '@/lib/classActions';
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

it('admin can create a class', async () => {
  const formData = new FormData();
  formData.append('name', 'Vitest Class');
  formData.append('year_group', '3');

  const result = await handleClassCreate(formData);

  expect(result.success).toBe(true);

  const { data } = await adminClient
    .from('classes')
    .select()
    .eq('name', 'Vitest Class')
    .is('deleted_at', null);

  expect(data).toHaveLength(1);
  expect(data![0].year_group).toBe('3');
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
