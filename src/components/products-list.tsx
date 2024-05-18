import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { useEffect, useId, useState } from 'react';
import Product from './product';
import { useProductList } from '../store/use-product-list';

const ProductsList = () => {
  const productList = useProductList((state) => state.productList);
  const setProductList = useProductList((state) => state.setProductList);
  const [products, setProducts] = useState(productList);

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
      setProductList(products);
    }
  };

  useEffect(() => {
    setProducts(productList);
  }, [productList]);

  useEffect(() => {
    setProductList(products);
  }, [products, setProductList]);

  const id = useId();

  return (
    <div className="space-y-6">
      <DndContext onDragEnd={handleDragEnd} id={id}>
        <ul className="divide-y">
          <SortableContext items={products}>
            {products.map((product, index) => (
              <Product
                product={product}
                totalProducts={products.length}
                index={index + 1}
                key={index}
              />
            ))}
          </SortableContext>
        </ul>
      </DndContext>
      <div className="flex justify-end">
        <button
          className="border-2 border-green-700 py-3 px-10 rounded text-sm font-semibold text-green-700 hover:bg-green-700 hover:text-white max-w-xs w-full"
          onClick={() => {
            setProducts((prev) => [...prev, { id: prev.length + 1 }]);
          }}
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default ProductsList;
