import { create } from 'zustand';

type Product = {
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

enum DiscountType {
  percentage = 'percentage',
  flat = 'flat',
}

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
