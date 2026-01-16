export type BookingOptionsType = {
  classNames: { id: number; name: string }[];
  producers: { id: number; name: string }[];
  times: { id: number; name: string }[];
};

export type EventType = {
  eventInfo: {
    id: number;
    title: string;
    start: Date;
    extendedProps: {
      name: string;
      producer: string;
      time: string;
      topic: string;
    };
  }[];
};

export type SelectedEventType = {
  allDay: boolean;
  title: string;
  start: Date;
  id: number;
  extendedProps: {
    name: string;
    class_id: number;
    producer_id: number;
    producer: string;
    time_id: number;
    time: string;
    topic: string;
  };
};
