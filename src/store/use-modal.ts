import { create } from 'zustand';

type State = {
  open: boolean;
};

type Action = {
  setOpen: () => void;
};

export const useModal = create<State & Action>((set) => ({
  open: false,
  setOpen: () => set(({ open }) => ({ open: !open })),
}));
