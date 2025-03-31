import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 relative">
      <h2 className="text-3xl font-semibold text-gray-800">{recipe.title}</h2>
      
      {/* Visa instruktionerna med max 5 rader och "..." vid överflödig text */}
      <p className="text-gray-600 mt-4 line-clamp-5" style={{ whiteSpace: "pre-line" }}>
        {recipe.instructions}
      </p>

      {/* Rendera taggar */}
      <div className="mt-6">
        <div className="flex gap-3 mt-3 flex-wrap">
          {recipe.tags.map((tag, index) => (
            <span key={index} className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;