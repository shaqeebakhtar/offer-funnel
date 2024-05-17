import { Product } from '../../types/product';

type ModalProductProps<T> = {
  product: T;
};

const ModalProduct = <T extends Product>({ product }: ModalProductProps<T>) => {
  console.log(product);
  return (
    <>
      <div className="border-b flex items-center gap-3 py-2 px-6  h-14">
        <input
          type="checkbox"
          name={product.title.toString()}
          id={product.title.toString()}
          className="w-5 h-5 accent-green-700"
        />
        <label
          htmlFor={product.title.toString()}
          className="w-full flex items-center gap-3"
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
            <div className="border-b py-2 px-6 pl-14 h-14 flex items-center gap-3">
              <input
                type="checkbox"
                name={variant.id.toString()}
                id={variant.id.toString()}
                className="w-5 h-5 accent-green-700"
              />
              <label
                htmlFor={variant.id.toString()}
                className="w-full flex items-center justify-between"
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
