import { Loader, Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { getAllProducts } from '../../data-access/products';
import { useModal } from '../../store/use-modal';
import { Product } from '../../types/product';
import ModalProduct from './modal-product';
import { useSelectedProduct } from '../../store/use-selected-product';
import { useProductList } from '../../store/use-product-list';

const AddProductsModal = () => {
  const setOpen = useModal((state) => state.setOpen);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currPage, setCurrPage] = useState(0);
  const [prevPage, setPrevPage] = useState(-10);
  const [lastProduct, setLastProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [prevSearchTerm, setPrevSearchTerm] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const productListRef = useRef<HTMLDivElement>(null);

  const selectedProducts = useSelectedProduct(
    (state) => state.selectedProducts
  );

  const clearSelectedProducts = useSelectedProduct(
    (state) => state.clearSelectedProducts
  );

  const setProductList = useProductList((state) => state.setProductList);

  const selectedProductListId = useProductList(
    (state) => state.selectedProductListId
  );
  const productList = useProductList((state) => state.productList);

  const handleProductListUpdate = () => {
    if (selectedProducts.length === 1 && selectedProductListId) {
      const updatedProductList = productList.map((item) =>
        item.id === selectedProductListId
          ? { ...item, product: selectedProducts[0] }
          : item
      );
      setProductList(updatedProductList);
    } else if (selectedProducts.length > 1) {
      let updatedProductList = productList;

      if (selectedProductListId) {
        updatedProductList = productList.map((item) =>
          item.id === selectedProductListId
            ? { ...item, product: selectedProducts[0] }
            : item
        );

        const remainingProducts = selectedProducts.slice(1);

        updatedProductList = [
          ...updatedProductList,
          ...remainingProducts.map((product, index) => ({
            id: productList.length + index + 1,
            product: {
              id: product.id,
              title: product.title,
              variants: product.variants,
            },
          })),
        ];
      } else {
        updatedProductList = [
          ...productList,
          ...selectedProducts.map((product, index) => ({
            id: productList.length + index + 1,
            product: {
              id: product.id,
              title: product.title,
              variants: product.variants,
            },
          })),
        ];
      }
      setProductList(updatedProductList);
    }

    clearSelectedProducts();
    setOpen();
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getAllProducts({ page: currPage, searchTerm });
      if (!data?.length) {
        setLastProduct(true);
        setIsLoading(false);
        return;
      }
      setPrevPage(currPage);
      if (
        (searchTerm !== '' && currPage === 0) ||
        (prevSearchTerm !== '' && searchTerm === '') ||
        currPage === 0
      ) {
        setAllProducts(data);
      } else {
        setAllProducts([...allProducts, ...data]);
      }
      setIsLoading(false);
    };

    if (
      (!lastProduct && prevPage !== currPage) ||
      (searchTerm !== '' && searchTerm !== prevSearchTerm) ||
      (prevSearchTerm !== '' && searchTerm === '')
    ) {
      setPrevSearchTerm(searchTerm);
      fetchData();
    }
  }, [
    allProducts,
    currPage,
    isTyping,
    lastProduct,
    prevPage,
    prevSearchTerm,
    searchTerm,
  ]);

  const handleScroll = () => {
    if (productListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = productListRef.current;

      if (scrollTop + clientHeight + 1.5 >= scrollHeight) {
        setCurrPage(currPage + 10);
      }
    }
  };

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
            onChange={(e) => {
              setSearchTerm(e.currentTarget.value);
              setCurrPage(0);
            }}
            onKeyDown={() => setIsTyping(true)}
            onKeyUp={() => setIsTyping(false)}
          />
        </div>
        {/* product list goes here */}
        <div
          className="h-[55vh] overflow-y-auto"
          ref={productListRef}
          onScroll={handleScroll}
        >
          {(isLoading && allProducts?.length === 0) || isTyping ? (
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
          <span>
            {selectedProducts.length} product
            {selectedProducts.length !== 1 ? 's' : ''} selected
          </span>
          <div className="space-x-2">
            <button
              className="border-2 py-1.5 px-6 font-semibold text-sm rounded text-gray-500 hover:bg-gray-200"
              onClick={() => {
                setOpen();
                clearSelectedProducts();
              }}
            >
              Cancel
            </button>
            <button
              className="border-2 border-green-700 py-1.5 px-6 font-semibold text-sm rounded text-white bg-green-700 hover:bg-green-800"
              onClick={handleProductListUpdate}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductsModal;
