import { GripVertical, X } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useProductList } from '../store/use-product-list';

type VariantProps = {
  variant: {
    id: number;
    title: string;
  };
  variants: { id: number; title: string }[];
  totalVariants: number;
  productId: number;
};

const Variant = ({
  variant,
  variants,
  totalVariants,
  productId,
}: VariantProps) => {
  const id = variant.id;

  const { attributes, listeners, setNodeRef, transform } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  const productList = useProductList((state) => state.productList);
  const setProductList = useProductList((state) => state.setProductList);

  const removeVariant = () => {
    const updatedProductList = productList.map((product) =>
      product.id === productId
        ? {
            ...product,
            product: {
              ...product.product,
              variants: variants.filter((variant) => variant.id !== id),
            },
          }
        : product
    );

    setProductList(updatedProductList);
  };

  return (
    <li ref={setNodeRef} style={style}>
      <div className="flex items-center gap-2 w-full">
        <GripVertical
          className="cursor-grab text-gray-600"
          {...attributes}
          {...listeners}
        />
        <div className="py-2 px-3 col-span-2 border border-gray-200 bg-white shadow cursor-pointer flex items-center justify-between rounded-sm w-full">
          <span className="text-gray-500">{variant.title}</span>
        </div>
        {totalVariants > 1 && (
          <X
            strokeWidth={2.5}
            className="cursor-pointer text-gray-500"
            onClick={removeVariant}
          />
        )}
      </div>
    </li>
  );
};

export default Variant;
