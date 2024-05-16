import { useId, useState } from 'react';
import Product from './product';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';

const ProductsList = () => {
  const [products, setProducts] = useState([{ id: 1 }, { id: 2 }, { id: 3 }]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setProducts((products) => {
        const oldIndex = products.indexOf(
          products.filter((product) => product.id === Number(active?.id))[0]
        );
        const newIndex = products.indexOf(
          products.filter((product) => product.id === Number(over?.id))[0]
        );

        return arrayMove(products, oldIndex, newIndex);
      });
    }
  };

  const id = useId();

  return (
    <div className="space-y-6">
      <DndContext onDragEnd={handleDragEnd} id={id}>
        <ul className="gap-3 divide-y">
          <SortableContext items={products}>
            {products.map((product, index) => (
              <Product product={product} index={index + 1} key={index} />
            ))}
          </SortableContext>
        </ul>
      </DndContext>
      <div className="flex justify-end">
        <button
          className="border-2 border-green-700 py-3 px-10 rounded text-sm font-semibold text-green-700 hover:bg-green-700 hover:text-white max-w-xs w-full"
          onClick={() => setProducts((prev) => [...prev, {}])}
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default ProductsList;

/*
  {
        "id": 77,
        "title": "Fog Linen Chambray Towel - Beige Stripe",
        "variants": [
            {
                "id": 1,
                "product_id": 77,
                "title": "XS / Silver",
                "price": "49"
            },
            {
                "id": 2,
                "product_id": 77,
                "title": "S / Silver",
                "price": "49"
            },
            {
                "id": 3,
                "product_id": 77,
                "title": "M / Silver",
                "price": "49"
            }
        ],
        "discount": 20,
        "discount_type": "flat"
        
    }
*/
