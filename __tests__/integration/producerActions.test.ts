import { beforeEach, afterEach, beforeAll, it, expect, vi } from 'vitest';
import {
  getProducersData,
  handleProducersCreate,
  handleProducersDelete,
} from '@/lib/producerActions';
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
  await adminClient.from('producers').delete().eq('name', 'Vitest Producer');
});

afterEach(async () => {
  await adminClient.from('producers').delete().eq('name', 'Vitest Producer');
});

it('getProducersData returns active producers', async () => {
  const { data: inserted } = await adminClient
    .from('producers')
    .insert({ name: 'Vitest Producer' })
    .select()
    .single();

  const result = await getProducersData();

  expect(result.find((producer) => producer.id === inserted!.id)).toBeDefined();
});

it('getProducersData excludes soft-deleted producers', async () => {
  const { data: inserted } = await adminClient
    .from('producers')
    .insert({ name: 'Vitest Producer' })
    .select()
    .single();

  await adminClient
    .from('producers')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', inserted!.id);

  const result = await getProducersData();

  expect(
    result.find((producer) => producer.id === inserted!.id),
  ).toBeUndefined();
});

it('admin can create a producer', async () => {
  const formData = new FormData();
  formData.append('name', 'Vitest Producer');

  const result = await handleProducersCreate(formData);

  expect(result.success).toBe(true);

  const { data } = await adminClient
    .from('producers')
    .select()
    .eq('id', result.data!.id)
    .is('deleted_at', null)
    .single();

  expect(data!.name).toBe('Vitest Producer');
});

it('admin can softDelete a producer', async () => {
  const { data: inserted } = await adminClient
    .from('producers')
    .insert({ name: 'Vitest Producer' })
    .select()
    .single();

  const result = await handleProducersDelete(inserted!.id);

  expect(result.success).toBe(true);
});
