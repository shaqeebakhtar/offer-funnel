import { X, Search, Loader } from 'lucide-react';
import { useModal } from '../../store/use-modal';
import { useEffect, useRef, useState } from 'react';
import { getAllProducts } from '../../data-access/products';
import ModalProduct from './modal-product';
import { Product } from '../../types/product';

const AddProductsModal = () => {
  const setOpen = useModal((state) => state.setOpen);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getAllProducts({ page, searchTerm });
      setAllProducts(data);
      setIsLoading(false);
    };

    fetchData();
  }, [page, searchTerm]);

  // const handleScroll = async () => {
  //   if (
  //     (modalRef.current &&
  //       modalRef.current.scrollTop + modalRef.current.clientHeight !==
  //         modalRef.current.offsetHeight) ||
  //     isLoading
  //   ) {
  //     return;
  //   }
  //   fetchData();
  // };

  // useEffect(() => {
  //   const modal = modalRef.current;
  //   if (modal) {
  //     modal.addEventListener('scroll', handleScroll);
  //   }

  //   return () => {
  //     if (modal) {
  //       modal.removeEventListener('scroll', handleScroll);
  //     }
  //   };
  // }, [isLoading]);

  return (
    <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px] grid place-items-center p-5">
      <div className="max-w-lg w-full bg-white rounded-md overflow-hidden">
        <div className="border-b py-3 px-6 flex items-center justify-between">
          <p className="font-semibold">Add Products</p>
          <X
            className="cursor-pointer text-gray-500 p-0.5 hover:border hover:bg-gray-200 hover:rounded-full"
            onClick={setOpen}
          />
        </div>
        <div className="border-b py-3 px-6 relative">
          <Search className="w-5 h-5 text-gray-500 absolute top-1/2 -translate-y-1/2 ml-3" />
          <input
            type="text"
            placeholder="Search products"
            className="border-2 w-full py-2 px-4 pl-10 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
          />
        </div>
        {/* product list goes here */}
        <div className="h-[55vh] overflow-y-auto" ref={modalRef}>
          {isLoading && allProducts?.length === 0 ? (
            <div className="w-full h-full grid place-items-center">
              <Loader className="w-5 h-5 text-gray-500 animate-spin" />
            </div>
          ) : allProducts && allProducts?.length > 0 ? (
            <>
              {allProducts.map((product) => (
                <ModalProduct product={product} key={product.id} />
              ))}
            </>
          ) : (
            <div className="w-full h-full grid place-items-center">
              <h3 className="text-lg font-semibold">No products found</h3>
            </div>
          )}
        </div>
        <div className="w-full border-t py-3 px-6 sticky bottom-0 z-10 bg-white shadow-[0_-20px_30px_-10px_rgba(0,0,0,0.1)] flex items-center justify-between">
          <span>1 product selected</span>
          <div className="space-x-2">
            <button
              className="border-2 py-1.5 px-6 font-semibold text-sm rounded text-gray-500 hover:bg-gray-200"
              onClick={setOpen}
            >
              Cancel
            </button>
            <button className="border-2 border-green-700 py-1.5 px-6 font-semibold text-sm rounded text-white bg-green-700 hover:bg-green-800">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductsModal;
