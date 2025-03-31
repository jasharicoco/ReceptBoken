const FilterDropdown = ({ selectedFilter, setSelectedFilter }) => {
  const categories = ["Frukost", "Lunch", "Middag", "Efterrätt", "Vegetariskt", "Veganskt", "Snacks"];

  return (
    <div className="mb-8">
      <select
        className="border border-gray-300 rounded-lg p-4 w-full md:w-1/3 mx-auto text-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm"
        value={selectedFilter}
        onChange={(e) => setSelectedFilter(e.target.value)}
      >
        <option value="">Alla kategorier</option>
        {categories.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
