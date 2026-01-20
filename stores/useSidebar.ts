import { create } from 'zustand';
import { EventApi } from '@fullcalendar/core';

type UnavailableType = {
  time_id: number;
};
type SidebarMode = 'Create' | 'Edit' | 'View' | null;

type SidebarState = {
  mode: SidebarMode;
  selectedDate: Date | null;
  selectedEvent: EventApi | null;
  unavailableTimes: UnavailableType[] | null;
  setMode: (
    nextMode: SidebarMode | ((prev: SidebarMode) => SidebarMode),
  ) => void;
  setSelectedDate: (date: Date | null) => void;
  setSelectedEvent: (
    event: EventApi | null | ((prev: EventApi | null) => EventApi | null),
  ) => void;
  setUnavailableTimes: (times: UnavailableType[] | null) => void;
};

export const useSidebar = create<SidebarState>((set) => ({
  mode: null,
  selectedDate: null,
  selectedEvent: null,
  unavailableTimes: null,
  setMode: (nextMode) => {
    set((state) => ({
      mode: typeof nextMode === 'function' ? nextMode(state.mode) : nextMode,
    }));
  },

  setSelectedDate: (date) => set({ selectedDate: date }),

  setSelectedEvent: (nextSelectedEvent) => {
    set((state) => ({
      selectedEvent:
        typeof nextSelectedEvent === 'function'
          ? nextSelectedEvent(state.selectedEvent)
          : nextSelectedEvent,
    }));
  },

  setUnavailableTimes: (nextUnavailableTimes) => {
    set({ unavailableTimes: nextUnavailableTimes });
  },
}));
