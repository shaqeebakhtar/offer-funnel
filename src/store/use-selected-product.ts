import { create } from 'zustand';

type SelectedProduct = {
  id: number;
  title: string;
  variants: {
    id: number;
    title: string;
    price: string;
    quantity: number;
  }[];
};

type State = {
  selectedProduct: SelectedProduct | null;
};

type Action = {
  setSelectedProduct: (product: State['selectedProduct']) => void;
};

export const useSelectedProduct = create<State & Action>((set) => ({
  selectedProduct: null,
  setSelectedProduct: (product: State['selectedProduct']) =>
    set(() => ({
      selectedProduct: product,
    })),
}));
