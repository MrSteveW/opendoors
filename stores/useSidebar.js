import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export const useSidebar = create(
  combine(
    {
      mode: null,
      selectedDate: null,
      selectedEvent: null,
      eventOptions: null,
      eventOptionsLoading: true,
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
        // selectedDate for Create
        setSelectedDate: (nextSelectedDate) => {
          set((state) => ({
            selectedDate:
              typeof nextSelectedDate === 'function'
                ? nextSelectedDate(state.selectedDate)
                : nextSelectedDate,
          }));
        },
        // selectedEvent for Edit & View
        setSelectedEvent: (nextSelectedEvent) => {
          set((state) => ({
            selectedEvent:
              typeof nextSelectedEvent === 'function'
                ? nextSelectedEvent(state.selectedEvent)
                : nextSelectedEvent,
          }));
        },
        // eventOptions fetched once on mount
        seteventOptions: (options) => {
          set({ eventOptions: options, eventOptionsLoading: false });
        },
        seteventOptionsLoading: (loading) => {
          set({ eventOptionsLoading: loading });
        },
        setUnavailableTimes: (nextUnavailableTimes) => {
          set({ unavailableTimes: nextUnavailableTimes });
        },
      };
    },
  ),
);
