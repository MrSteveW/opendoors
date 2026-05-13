import {
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
  it,
  expect,
  vi,
} from 'vitest';
import {
  handleEventCreate,
  handleEventEdit,
  handleEventDelete,
} from '@/lib/eventActions';
import { createClerkSupabaseClient } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';

vi.mock('@/lib/supabase');
vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }));

const adminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

let classId: number;
let classId2: number;
let producerId: number;
let producerId2: number;
let timeId: number;
let timeId2: number;

beforeAll(() => {
  vi.mocked(createClerkSupabaseClient).mockImplementation(
    async () => adminClient,
  );
});

beforeAll(async () => {
  const { data: cls } = await adminClient
    .from('classes')
    .insert({ name: 'Vitest Event Class', year_group: '3' })
    .select('id')
    .single();
  const { data: cls2 } = await adminClient
    .from('classes')
    .insert({ name: 'Vitest Event Class 2', year_group: '4' })
    .select('id')
    .single();
  const { data: prod } = await adminClient
    .from('producers')
    .insert({ name: 'Vitest Event Producer' })
    .select('id')
    .single();
  const { data: prod2 } = await adminClient
    .from('producers')
    .insert({ name: 'Vitest Event Producer 2' })
    .select('id')
    .single();
  const { data: time } = await adminClient
    .from('times')
    .insert({
      name: 'Vitest Event Time',
      display_order: 1002,
      icon: 'Activity',
    })
    .select('id')
    .single();
  const { data: time2 } = await adminClient
    .from('times')
    .insert({
      name: 'Vitest Event Time 2',
      display_order: 1003,
      icon: 'Activity',
    })
    .select('id')
    .single();
  classId = cls!.id;
  classId2 = cls2!.id;
  producerId = prod!.id;
  producerId2 = prod2!.id;
  timeId = time!.id;
  timeId2 = time2!.id;
});

beforeEach(async () => {
  await adminClient
    .from('events')
    .delete()
    .in('name', ['Vitest Event', 'Vitest Event Edited']);
});

afterEach(async () => {
  await adminClient
    .from('events')
    .delete()
    .in('name', ['Vitest Event', 'Vitest Event Edited']);
});

afterAll(async () => {
  await adminClient.from('classes').delete().eq('name', 'Vitest Event Class');
  await adminClient.from('classes').delete().eq('name', 'Vitest Event Class 2');
  await adminClient
    .from('producers')
    .delete()
    .eq('name', 'Vitest Event Producer');
  await adminClient
    .from('producers')
    .delete()
    .eq('name', 'Vitest Event Producer 2');
  await adminClient.from('times').delete().eq('name', 'Vitest Event Time');
  await adminClient.from('times').delete().eq('name', 'Vitest Event Time 2');
});

it('admin can create an event with no producer', async () => {
  const formData = new FormData();
  formData.append('date', new Date().toISOString());
  formData.append('name', 'Vitest Event');
  formData.append('class_id', classId.toString());
  formData.append('time_id', timeId.toString());
  formData.append('topic', 'Testing');

  const result = await handleEventCreate(formData);

  expect(result.success).toBe(true);

  const { data } = await adminClient
    .from('events')
    .select()
    .eq('id', result.data!.id)
    .single();

  expect(data!.name).toBe('Vitest Event');
});

it('admin can create an event with a producer', async () => {
  const formData = new FormData();
  formData.append('date', new Date().toISOString());
  formData.append('name', 'Vitest Event');
  formData.append('class_id', classId.toString());
  formData.append('time_id', timeId.toString());
  formData.append('producers', producerId.toString());
  formData.append('topic', 'Testing');

  const result = await handleEventCreate(formData);

  expect(result.success).toBe(true);

  const { data } = await adminClient
    .from('events')
    .select()
    .eq('id', result.data!.id)
    .single();

  expect(data!.name).toBe('Vitest Event');
});

it('admin can edit an event', async () => {
  const { data: inserted } = await adminClient
    .from('events')
    .insert({
      name: 'Vitest Event',
      date: new Date().toISOString(),
      class_id: classId,
      time_id: timeId,
    })
    .select()
    .single();

  await adminClient
    .from('events_producers')
    .insert({ event_id: inserted!.id, producer_id: producerId });

  const formData = new FormData();
  formData.append('id', inserted!.id.toString());
  formData.append('name', 'Vitest Event Edited');
  formData.append('class_id', classId2.toString());
  formData.append('time_id', timeId2.toString());
  formData.append('topic', 'Edited Topic');
  formData.append('producers', producerId2.toString());

  const result = await handleEventEdit(formData);

  expect(result.success).toBe(true);

  const { data } = await adminClient
    .from('events')
    .select()
    .eq('id', inserted!.id)
    .single();

  expect(data!.name).toBe('Vitest Event Edited');
  expect(data!.class_id).toBe(classId2);
  expect(data!.time_id).toBe(timeId2);
  expect(data!.topic).toBe('Edited Topic');

  const { data: junction } = await adminClient
    .from('events_producers')
    .select()
    .eq('event_id', inserted!.id);

  expect(junction).toHaveLength(1);
  expect(junction![0].producer_id).toBe(producerId2);
});

it('admin can delete an event', async () => {
  const { data: inserted } = await adminClient
    .from('events')
    .insert({
      name: 'Vitest Event',
      date: new Date().toISOString(),
      class_id: classId,
      time_id: timeId,
    })
    .select()
    .single();

  const result = await handleEventDelete(inserted!.id);

  expect(result.success).toBe(true);

  const { data } = await adminClient
    .from('events')
    .select()
    .eq('id', inserted!.id)
    .maybeSingle();

  expect(data).toBeNull();
});
