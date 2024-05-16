import AddProductsModal from './components/modal/add-products-modal';
import ProductsList from './components/products-list';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen pt-20 p-5">
      <div className="max-w-screen-lg w-full mx-auto space-y-8">
        <h3 className="text-lg font-semibold">Add Products</h3>
        <ProductsList />
      </div>
      <AddProductsModal />
    </div>
  );
}

export default App;
