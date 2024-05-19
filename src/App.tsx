import { useEffect } from 'react';
import AddProductsModal from './components/modal/add-products-modal';
import ProductsList from './components/products-list';
import { useModal } from './store/use-modal';

function App() {
  const open = useModal((state) => state.open);

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [open]);

  return (
    <div className="bg-gray-50 min-h-screen pt-20 p-5">
      <div className="max-w-screen-lg w-full mx-auto space-y-8">
        <h3 className="text-lg font-semibold">Add Products</h3>
        <ProductsList />
      </div>
      {open && <AddProductsModal />}
    </div>
  );
}

export default App;
