import { useEffect, useRef, useState } from 'react';
import { Product } from '../../types/product';
import { useSelectedProduct } from '../../store/use-selected-product';

type ModalProductProps<T> = {
  product: T;
};

const ModalProduct = <T extends Product>({ product }: ModalProductProps<T>) => {
  const [parentChecked, setParentChecked] = useState(false);
  const [childChecked, setChildChecked] = useState<{ [key: string]: boolean }>(
    {}
  );
  const parentCheckboxRef = useRef<HTMLInputElement>(null);

  const setSelectedProduct = useSelectedProduct(
    (state) => state.setSelectedProduct
  );

  const handleParentChange = () => {
    setParentChecked(!parentChecked);

    setChildChecked(
      Object.fromEntries(
        product.variants?.map((variant) => [variant.id, !parentChecked]) || []
      )
    );
  };

  const handleChildChange = (variantId: string) => {
    setChildChecked((prev) => ({
      ...prev,
      [variantId]: !prev[variantId],
    }));
  };

  useEffect(() => {
    const totalChildren = product.variants?.length || 0;
    const checkedChildren = Object.values(childChecked).filter(Boolean).length;

    if (parentCheckboxRef.current) {
      parentCheckboxRef.current.indeterminate =
        checkedChildren > 0 && checkedChildren < totalChildren;
    }

    setParentChecked(totalChildren === checkedChildren);

    if (checkedChildren > 0) {
      setSelectedProduct({
        title: product.title,
        variants: product.variants
          .filter((variant) => childChecked[variant.id])
          .map((variant) => variant.title),
      });
    }
  }, [childChecked, product.title, product.variants, setSelectedProduct]);

  return (
    <>
      <div className="border-b flex items-center gap-3 py-2 px-6  h-14">
        <input
          type="checkbox"
          name={product.id.toString()}
          id={product.id.toString()}
          className="w-5 h-5 accent-green-700"
          checked={parentChecked}
          onChange={handleParentChange}
          ref={parentCheckboxRef}
        />
        <label
          htmlFor={product.id.toString()}
          className="w-full h-full flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded overflow-hidden">
            {product.image?.src ? (
              <img src={product.image?.src} className="w-full h-full" />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </div>
          <p className="font-medium">{product.title}</p>
        </label>
      </div>
      {product.variants && (
        <>
          {product.variants.map((variant) => (
            <div
              className="border-b py-2 px-6 pl-14 h-14 flex items-center gap-3"
              key={variant.id}
            >
              <input
                type="checkbox"
                name={variant.id.toString()}
                id={variant.id.toString()}
                className="w-5 h-5 accent-green-700"
                checked={!!childChecked[variant.id.toString()]}
                onChange={() => handleChildChange(variant.id.toString())}
              />
              <label
                htmlFor={variant.id.toString()}
                className="w-full h-full flex items-center justify-between"
              >
                <p>{variant.title}</p>
                <p className="font-semibold">${variant.price}</p>
              </label>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default ModalProduct;
