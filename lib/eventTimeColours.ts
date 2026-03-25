export const EVENT_LABEL_COLOURS: Record<string, string> = {
  1: 'text-openblue',
  2: 'text-openyellow',
  3: 'text-opengreen',
  4: 'text-violet-600',
  5: 'text-red-500',
};

export const getEventTimeColor = (display_order?: number): string => {
  return EVENT_LABEL_COLOURS[display_order ?? ''] ?? 'bg-white';
};
