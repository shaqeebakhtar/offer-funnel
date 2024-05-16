import ProductsList from './components/products-list';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen grid place-items-center p-5">
      <div className="max-w-screen-lg w-full mx-auto space-y-8">
        <h3 className="text-lg font-semibold">Add Products</h3>
        <ProductsList />
      </div>
    </div>
  );
}

export default App;
