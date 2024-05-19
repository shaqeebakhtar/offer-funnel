import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Pencil, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useModal } from '../store/use-modal';
import { useProductList } from '../store/use-product-list';
import AddDiscount from './add-discount';
import HideShowVariants from './hide-show-variants';

type ProductProps = {
  totalProducts: number;
  product: {
    id: number;
    product?: {
      id: number;
      title: string;
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
  index: number;
};

enum DiscountType {
  percentage = 'percentage',
  flat = 'flat',
}

const Product = ({ product, index, totalProducts }: ProductProps) => {
  const setOpen = useModal((state) => state.setOpen);
  const setCurrProduct = useModal((state) => state.setCurrProduct);
  const setSelectedProductListId = useProductList(
    (state) => state.setSelectedProductListId
  );
  const productList = useProductList((state) => state.productList);
  const setProductList = useProductList((state) => state.setProductList);

  const [showAddDiscount, setShowAddDiscount] = useState(false);

  const id = product.id;

  const { attributes, listeners, setNodeRef, transform } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  const removeProduct = () => {
    const newProductList = productList.filter((product) => product.id !== id);

    setProductList(newProductList);
  };

  useEffect(() => {
    setShowAddDiscount(false);
  }, [productList]);

  return (
    <li className="flex flex-col gap-3 py-5" ref={setNodeRef} style={style}>
      <div className="flex items-center gap-2 w-full">
        <GripVertical
          className="cursor-grab text-gray-600"
          {...attributes}
          {...listeners}
        />
        <span className="text-sm text-gray-500">{index}.</span>
        <div className="grid grid-cols-3 gap-3 w-full">
          <div
            className="py-2 px-3 col-span-2 border border-gray-200 bg-white shadow cursor-pointer flex items-center justify-between rounded-sm"
            onClick={() => {
              setOpen();
              setSelectedProductListId(product.id);
              setCurrProduct(product.product);
            }}
          >
            <span
              className={
                product.product?.title
                  ? 'text-gray-700 font-semibold'
                  : 'text-gray-500'
              }
            >
              {product.product?.title
                ? product.product?.title
                : 'Select Product'}
            </span>
            <Pencil className="w-4 h-4 text-green-700" />
          </div>
          {showAddDiscount || product.discount ? (
            <AddDiscount product={product} id={id} />
          ) : (
            <button
              className="border-2 border-green-700 py-3 px-10 rounded text-sm font-semibold text-white bg-green-700 hover:bg-transparent hover:text-green-700"
              onClick={() => setShowAddDiscount(true)}
            >
              Add Discount
            </button>
          )}
        </div>
        {totalProducts > 1 && (
          <X
            strokeWidth={2.5}
            className="cursor-pointer text-gray-500"
            onClick={removeProduct}
          />
        )}
      </div>
      {product.product?.variants && (
        <HideShowVariants
          productVariants={product.product?.variants}
          productId={product.id}
        />
      )}
    </li>
  );
};

export default Product;
