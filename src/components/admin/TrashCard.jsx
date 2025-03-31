import React from 'react';

const TrashCard = ({ recipe, restoreRecipe, confirmDelete }) => (
  <div 
  className="relative flex justify-between items-start p-6 border border-gray-200 rounded-xl shadow-lg bg-white hover:shadow-2xl transition duration-300 ease-in-out min-h-[250px]"
>
  <div className="flex-grow">
    <h3 className="text-2xl font-semibold text-gray-800">{recipe.title}</h3>
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
        className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium">
          {tag}
        </span>
      ))}
    </div>
  </div>

  {/* Knapparna som är fästa på höger sida */}
  <div className="absolute right-6 top-6 flex gap-4">
  <button
          onClick={() => restoreRecipe(recipe.id)}
          className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Återställ
        </button>
    <button
          onClick={() => confirmDelete(recipe.id)}
          className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Ta bort
        </button>
  </div>
</div>
);

export default TrashCard;
