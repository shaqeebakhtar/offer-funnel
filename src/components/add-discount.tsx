const AddDiscount = () => {
  return (
    <div className="flex items-center space-x-2 h-12">
      <input
        type="text"
        className="h-full border-2 bg-white w-full py-2 px-4 rounded"
      />
      <select
        name="discount-type"
        id="discount-type"
        className="h-full border-2 bg-white w-full py-2 px-2 rounded text-sm"
      >
        <option value="flat-discount">Flat Off</option>
        <option value="perc-discount">% Off</option>
      </select>
    </div>
  );
};

export default AddDiscount;
