import Product from './product';

const ProductsList = () => {
  return (
    <div className="space-y-6">
      <ul className="gap-3 divide-y">
        <Product />
        <Product />
        <Product />
      </ul>
      <div className="flex justify-end">
        <button className="border-2 border-green-700 py-3 px-10 rounded text-sm font-semibold text-green-700 hover:bg-green-700 hover:text-white max-w-xs w-full">
          Add Product
        </button>
      </div>
    </div>
  );
};

export default ProductsList;
