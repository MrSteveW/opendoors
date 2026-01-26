import { create } from 'zustand';

type AdminMode = 'Classes' | 'Producers' | 'Times' | 'Stats' | null;

type DialogState = {
  adminMode: AdminMode;
  setAdminMode: (mode: AdminMode) => void;
};

export const useAdminPanel = create<DialogState>((set) => ({
  adminMode: null,
  setAdminMode: (mode) => set({ adminMode: mode }),
}));
