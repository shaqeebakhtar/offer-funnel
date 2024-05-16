import { ChevronDown, ChevronUp } from 'lucide-react';
import { useId, useState } from 'react';
import Variant from './variant';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';

const HideShowVariants = () => {
  const [showVariants, setShowVariants] = useState(false);
  const [variants, setVariants] = useState([{ id: 1 }, { id: 2 }, { id: 3 }]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setVariants((variants) => {
        const oldIndex = variants.indexOf(
          variants.filter((variant) => variant.id === Number(active?.id))[0]
        );
        const newIndex = variants.indexOf(
          variants.filter((variant) => variant.id === Number(over?.id))[0]
        );

        return arrayMove(variants, oldIndex, newIndex);
      });
    }
  };

  const id = useId();

  return (
    <div className="w-full flex flex-col items-end gap-3">
      <div
        className="flex items-center space-x-1 underline text-blue-600 underline-offset-2 cursor-pointer"
        onClick={() => setShowVariants(!showVariants)}
      >
        <span className="text-sm">
          {showVariants ? 'Hide Variants' : 'Show Variants'}
        </span>
        {showVariants ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </div>
      {showVariants && (
        <DndContext onDragEnd={handleDragEnd} id={id}>
          <ul className="space-y-4 w-[90%]">
            <SortableContext items={variants}>
              {variants.map((variant, index) => (
                <Variant variant={variant} key={index} />
              ))}
            </SortableContext>
          </ul>
        </DndContext>
      )}
    </div>
  );
};

export default HideShowVariants;
