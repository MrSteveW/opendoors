import { NextRequest, NextResponse } from 'next/server';
import { createClerkSupabaseClient } from '@/lib/supabase';
import { EventsDataType } from '@/types';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const start = searchParams.get('start');
  const end = searchParams.get('end');

  if (!start || !end) {
    return NextResponse.json(
      { error: 'start and end query parameters are required' },
      { status: 400 },
    );
  }

  const startDate = start.slice(0, 10);
  const endDate = end.slice(0, 10);

  const supabase = await createClerkSupabaseClient();

  const { data, error } = await supabase
    .from('events')
    .select(
      `
      id,
      date,
      name,
      topic,
      class_id,
      iscomplete,
      events_producers(producers(id, name)),
      times(id, display_order, name, icon)
      `,
    )
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const events = (data ?? []).map((row) => {
    const producers = (
      row.events_producers as unknown as {
        producers: { id: number; name: string };
      }[]
    ).map((ep) => ep.producers);
    const times = row.times as unknown as {
      id: number;
      display_order: number;
      name: string;
      icon: string;
    };

    return {
      id: row.id,
      date: row.date,
      name: row.name,
      topic: row.topic,
      class_id: row.class_id,
      producers,
      iscomplete: row.iscomplete,
      time_id: times.id,
      order: times.display_order,
      time: times.name,
      icon: times.icon,
    } satisfies EventsDataType;
  });

  return NextResponse.json(events);
}
