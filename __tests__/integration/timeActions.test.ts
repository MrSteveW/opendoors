import { beforeEach, afterEach, beforeAll, it, expect, vi } from 'vitest';
import {
  getTimesData,
  handleTimesCreate,
  handleTimesDelete,
} from '@/lib/timesActions';
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
  await adminClient.from('times').delete().eq('name', 'Vitest Time');
});

afterEach(async () => {
  await adminClient.from('times').delete().eq('name', 'Vitest Time');
});

it('getTimesData returns active times', async () => {
  const { data: inserted } = await adminClient
    .from('times')
    .insert({ name: 'Vitest Time', display_order: 1001, icon: 'Activity' })
    .select()
    .single();

  const result = await getTimesData();

  expect(result.find((time) => time.id === inserted!.id)).toBeDefined();
});

it('getTimesData excludes soft-deleted times', async () => {
  const { data: inserted } = await adminClient
    .from('times')
    .insert({ name: 'Vitest Time', display_order: 1001, icon: 'Activity' })
    .select()
    .single();

  await adminClient
    .from('times')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', inserted!.id);

  const result = await getTimesData();

  expect(result.find((time) => time.id === inserted!.id)).toBeUndefined();
});

it('admin can create a time', async () => {
  const formData = new FormData();
  formData.append('name', 'Vitest Time');
  formData.append('display_order', '1001');
  formData.append('icon', 'Activity');

  const result = await handleTimesCreate(formData);

  expect(result.success).toBe(true);

  const { data } = await adminClient
    .from('times')
    .select()
    .eq('name', 'Vitest Time')
    .is('deleted_at', null);

  expect(data).toHaveLength(1);
  expect(data![0].display_order).toBe(1001);
  expect(data![0].icon).toBe('Activity');
});

it('admin can softDelete a time', async () => {
  const { data: inserted } = await adminClient
    .from('times')
    .insert({ name: 'Vitest Time', display_order: 1001, icon: 'Activity' })
    .select()
    .single();

  const result = await handleTimesDelete(inserted!.id);

  expect(result.success).toBe(true);

  const { data } = await adminClient
    .from('times')
    .select()
    .eq('id', inserted!.id)
    .single();

  expect(data!.deleted_at).not.toBeNull();
});
