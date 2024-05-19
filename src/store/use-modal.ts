import { create } from 'zustand';

type State = {
  open: boolean;
  currProduct?: {
    id: number;
    title: string;
    variants: {
      id: number;
      title: string;
      price: string;
      quantity: number;
    }[];
    discount?: {
      amount: string;
      type: DiscountType;
    };
  };
};

enum DiscountType {
  percentage = 'percentage',
  flat = 'flat',
}

type Action = {
  setOpen: () => void;
  setCurrProduct: (currProduct: State['currProduct']) => void;
};

export const useModal = create<State & Action>((set) => ({
  open: false,
  setOpen: () => set(({ open }) => ({ open: !open })),
  setCurrProduct: (currProduct: State['currProduct']) =>
    set(() => ({ currProduct })),
}));
