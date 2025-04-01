import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <div 
      className="relative flex flex-col justify-between items-start p-6 border border-gray-200 rounded-xl shadow-lg bg-[#f7fff7] hover:bg-green-50 hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer mb-6"
    >
      <div className="flex-grow">
        <h3 className="text-2xl font-semibold text-[#4a6f47]">{recipe.title}</h3>
        
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
        
        {/* Rendera taggar */}
        <div className="flex gap-3 mt-3 flex-wrap">
          {recipe.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-green-100 text-gray-700 px-4 py-2 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
