const FilterDropdown = ({ selectedFilter, setSelectedFilter }) => {
  const categories = [
    "Frukost", "Lunch", "Middag", "Efterrätt", "Snacks"
  ];

  return (
    <div className="mb-8">
      <select
        className="border border-gray-300 rounded-lg p-4 w-full md:w-1/3 mx-auto text-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-[#f7fff7] shadow-sm hover:bg-green-50 transition duration-300 ease-in-out"
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