import React from 'react';

const TrashCard = ({ recipe, restoreRecipe, confirmDelete }) => (
  <div 
    className="relative flex flex-col justify-between items-start p-6 border border-gray-200 rounded-xl shadow-lg bg-[#f7fff7] hover:bg-green-50 hover:shadow-2xl transition duration-300 ease-in-out mb-6"
  >
    <div className="flex-grow">
      <h3 className="text-2xl font-semibold text-[#4a6f47]">{recipe.title}</h3>
      <div className="relative">
        {/* Visa instruktionerna med max 5 rader och "..." vid överflödig text */}
        <p className="text-gray-600 mt-4" style={{
          whiteSpace: "pre-line",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 5,
          overflow: "hidden"
        }}>
          {recipe.instructions}
        </p>
      </div>
      
      {/* Rendera taggar */}
      <div className="flex gap-3 mt-3 flex-wrap">
        {recipe.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Knapparna som ligger under taggarna */}
      <div className="flex gap-3 mt-3 flex-wrap">
        <button
          onClick={() => restoreRecipe(recipe.id)}
          className="bg-[#8ab88c] text-white px-4 py-2 rounded-full text-xs hover:bg-[#85c488] transition duration-300 ease-in-out transform hover:scale-105"
        >
          Återställ
        </button>
        <button
        <button
          onClick={() => confirmDelete(recipe.id)}
          className="bg-[#b88a8a] text-white px-4 py-2 rounded-full text-xs hover:bg-[#d18787] transition duration-300 ease-in-out transform hover:scale-105"
        >
          Ta bort
        </button>
      </div>
    </div>
  </div>
);

export default TrashCard;
