import { StateCreator } from 'zustand';

export interface IDrawerSlice {
  isDrawerOpen: boolean;

  showDrawer: () => void;
  hideDrawer: () => void;
}

const createDrawerSlice: StateCreator<IDrawerSlice> = (set, get) => ({
  isDrawerOpen: false,
  showDrawer: () => {
    set({ isDrawerOpen: true });
  },
  hideDrawer: () => {
    set({
      isDrawerOpen: false,
    });
  },
});

export default createDrawerSlice;
