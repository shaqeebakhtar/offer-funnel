import { useEffect, useState } from 'react';
import { useProductList } from '../store/use-product-list';

type AddDiscountProps = {
  product: {
    id: number;
    product?: {
      title?: string;
      variants: {
        id: number;
        title: string;
        price: string;
        quantity: number;
      }[];
    };
    discount?: {
      amount: string;
      type: DiscountType;
    };
  };
  id: number;
};

enum DiscountType {
  percentage = 'percentage',
  flat = 'flat',
}

const AddDiscount = ({ product, id }: AddDiscountProps) => {
  const [amount, setAmount] = useState(product.discount?.amount || '');
  const [discountType, setDiscountType] = useState(
    product.discount?.type || DiscountType.flat
  );

  const productList = useProductList((state) => state.productList);
  const setProductList = useProductList((state) => state.setProductList);

  useEffect(() => {
    if (amount !== '' || discountType !== DiscountType.flat) {
      const updatedProductList = productList.map((product) =>
        product.id === id
          ? {
              ...product,
              discount: {
                amount,
                type: discountType,
              },
            }
          : product
      );

      setProductList(updatedProductList);
    }
  }, [amount, discountType, id]);

  useEffect(() => {
    setAmount(product.discount?.amount || '');
    setDiscountType(product.discount?.type || DiscountType.flat);
  }, [product, id, amount, discountType]);

  return (
    <div className="flex items-center space-x-2 h-12">
      <input
        type="text"
        className="h-full border-2 bg-white w-full py-2 px-4 rounded"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select
        name="discount-type"
        id="discount-type"
        className="h-full border-2 bg-white w-full py-2 px-2 rounded text-sm"
        value={discountType}
        onChange={(e) => setDiscountType(e.target.value as DiscountType)}
      >
        <option value={DiscountType.flat}>Flat Off</option>
        <option value={DiscountType.percentage}>% Off</option>
      </select>
    </div>
  );
};

export default AddDiscount;
