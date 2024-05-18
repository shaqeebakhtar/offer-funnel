import { create } from 'zustand';

type SelectedProduct = {
  title: string;
  variants: string[];
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
