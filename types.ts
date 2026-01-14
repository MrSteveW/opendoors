export type FormOptionsType = {
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
