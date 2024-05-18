import { create } from 'zustand';

type Product = {
  title?: string;
  variants?: string[] | { id: number; title: string }[];
};

type State = {
  productList: {
    id: number;
    product?: Product;
  }[];
  selectedProductListId: number | null;
};

type Action = {
  setProductList: (productList: State['productList']) => void;
  setSelectedProductListId: (id: State['selectedProductListId']) => void;
};

export const useProductList = create<State & Action>((set) => ({
  productList: [{ id: 1 }],
  selectedProductListId: null,
  setProductList: (productList: State['productList']) =>
    set(() => ({ productList })),
  setSelectedProductListId: (id: State['selectedProductListId']) =>
    set(() => ({ selectedProductListId: id })),
}));
