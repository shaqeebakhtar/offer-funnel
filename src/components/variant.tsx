import { GripVertical, X } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type VariantProps = {
  variant: {
    id: number;
  };
};

const Variant = ({ variant }: VariantProps) => {
  const id = variant.id;

  const { attributes, listeners, setNodeRef, transform } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
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
          <span className="text-gray-500">Variant {id}</span>
        </div>
        <X strokeWidth={2.5} className="cursor-pointer text-gray-500" />
      </div>
    </li>
  );
};

export default Variant;
