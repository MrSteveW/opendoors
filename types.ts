export type ClassesAdminProps = {
  classData: { id: number; name: string; deleted_at: Date }[];
};

export type ProducersAdminProps = {
  producersData: { id: number; name: string; deleted_at: Date }[];
};

export type EventsData = {
  id: number;
  date: string;
  name: string;
  class_id: number;
  producer_id: number;
  producer: string;
  time_id: number;
  order: number;
  time: string;
  topic: string;
};

export type ItemData = {
  id: number;
  name: string;
};

type OptionType = {
  id: number;
  name: string;
};

export type EventOptionsType = {
  classNames: OptionType[];
  producers: OptionType[];
  times: OptionType[];
};
