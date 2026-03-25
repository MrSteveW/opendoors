export type EventsDataType = {
  id: number;
  date: string;
  name: string;
  topic: string;
  class_id: number;
  producer_id: number;
  producer: string;
  time_id: number;
  order: number;
  time: string;
  icon: string;
};

type ClassOptionType = {
  id: number;
  name: string;
  year_group: string;
};

type OptionType = {
  id: number;
  name: string;
};

export type EventOptionsType = {
  classNames: ClassOptionType[];
  producers: OptionType[];
  times: OptionType[];
};

// Admin
export type ItemData = {
  id: number;
  name: string;
};

export type ClassItem = {
  id: number;
  name: string;
  year_group: string;
};

export type ProducerItem = {
  id: number;
  name: string;
};

export type TimesItem = {
  id: number;
  name: string;
  display_order: number;
  icon: string;
};

export type IconsItem = {
  name: string;
};
