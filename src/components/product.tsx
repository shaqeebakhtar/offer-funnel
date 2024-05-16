import { Pencil, GripVertical, X } from 'lucide-react';
import { useModal } from '../store/use-modal';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import HideShowVariants from './hide-show-variants';

type ProductProps = {
  product: {
    id: number;
  };
  index: number;
};

const Product = ({ product, index }: ProductProps) => {
  const setOpen = useModal((state) => state.setOpen);

  const id = product.id;

  const { attributes, listeners, setNodeRef, transform } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

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
            className="py-2 px-3 col-span-2 border border-gray-200 shadow cursor-pointer flex items-center justify-between rounded-sm"
            onClick={setOpen}
          >
            <span className="text-gray-500">Select Product {id}</span>
            <Pencil className="w-4 h-4 text-green-700" />
          </div>
          <button className="border-2 border-green-700 py-3 px-10 rounded text-sm font-semibold text-white bg-green-700 hover:bg-transparent hover:text-green-700">
            Add Discount
          </button>
        </div>
        <X strokeWidth={2.5} className="cursor-pointer text-gray-500" />
      </div>
      <HideShowVariants />
    </li>
  );
};

export default Product;
