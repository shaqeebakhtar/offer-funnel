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
  selectedProducts: SelectedProduct[];
};

type Action = {
  setSelectedProducts: (product: SelectedProduct) => void;
  removeSelectedProduct: (productId: number) => void;
  clearSelectedProducts: () => void;
  updateSelectedProductVariants: (
    productId: number,
    newVariants: SelectedProduct['variants']
  ) => void;
};

export const useSelectedProduct = create<State & Action>((set) => ({
  selectedProducts: [],
  setSelectedProducts: (product: SelectedProduct) =>
    set((state) => ({
      selectedProducts: [...state.selectedProducts, product],
    })),
  removeSelectedProduct: (productId: number) =>
    set((state) => ({
      selectedProducts: state.selectedProducts.filter(
        (product) => product.id !== productId
      ),
    })),
  clearSelectedProducts: () => set(() => ({ selectedProducts: [] })),
  updateSelectedProductVariants: (
    productId: number,
    newVariants: SelectedProduct['variants']
  ) =>
    set((state) => ({
      selectedProducts: state.selectedProducts.map((product) =>
        product.id === productId
          ? { ...product, variants: newVariants }
          : product
      ),
    })),
}));
