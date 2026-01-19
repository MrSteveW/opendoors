import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export const useSidebar = create(
  combine(
    {
      mode: null,
      selectedDate: null,
      selectedEvent: null,
      unavailableTimes: null,
    },
    (set) => {
      return {
        // Mode will set the Sidebar mode: Create | Edit | View | Null
        setMode: (nextMode) => {
          set((state) => ({
            mode:
              typeof nextMode === 'function' ? nextMode(state.mode) : nextMode,
          }));
        },
        setSelectedDate: (nextSelectedDate) => {
          set((state) => ({
            selectedDate:
              typeof nextSelectedDate === 'function'
                ? nextSelectedDate(state.selectedDate)
                : nextSelectedDate,
          }));
        },
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
      };
    },
  ),
);
