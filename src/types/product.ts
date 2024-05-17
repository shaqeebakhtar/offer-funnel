export type Product = {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  image: {
    id: number;
    product_id: number;
    src: string;
  };
  variants: {
    id: number;
    product_id: number;
    title: string;
    price: string;
    option1: string;
    created_at: string;
    updated_at: string;
    inventory_quantity: number;
  }[];
};
