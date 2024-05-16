import { useState } from 'react';
import Product from './product';

const ProductsList = () => {
  const [products, setProducts] = useState([{}, {}, {}]);

  return (
    <div className="space-y-6">
      <ul className="gap-3 divide-y">
        {products.map((_, index) => (
          <Product index={index + 1} key={index} />
        ))}
      </ul>
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
