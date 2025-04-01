import { useState } from "react";

const RecipeCard = ({ recipe, editRecipe, deleteRecipe, setSelectedRecipe }) => {
  // Scrolla till toppen av sidan när man trycker ändra recept
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Funktion för att hantera klick på kortet
  const handleCardClick = () => {
    setSelectedRecipe(recipe);  // Sätt den valda receptet för att öppna modalen
  };

  return (
    <div 
      className="relative flex flex-col justify-between items-start p-6 border border-gray-200 rounded-xl shadow-lg bg-[#f7fff7] hover:bg-green-50 hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer mb-6"
      onClick={handleCardClick}  
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
              className="bg-green-100 text-gray-700 px-4 py-2 rounded-full text-xs font-medium" // Mindre storlek på taggarna
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Knapparna som ligger under taggarna */}
        <div className="flex gap-3 mt-3 flex-wrap">
          <button
            onClick={(e) => { 
              e.stopPropagation();
              editRecipe(recipe.id); 
              scrollToTop();
            }}
            className="bg-[#b8b68a] text-white px-4 py-2 rounded-full text-xs hover:bg-[#c7c489] transition duration-300 ease-in-out transform hover:scale-105"
          >
            Ändra
          </button>
          <button
            onClick={(e) => { 
              e.stopPropagation();
              deleteRecipe(recipe.id); 
            }}
            className="bg-[#b88a8a] text-white px-4 py-2 rounded-full text-xs hover:bg-[#d18787] transition duration-300 ease-in-out transform hover:scale-105"
          >
            Ta bort
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
