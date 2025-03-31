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
      className="relative flex justify-between items-start p-6 border border-gray-200 rounded-xl shadow-lg bg-white hover:shadow-2xl transition duration-300 ease-in-out"
      onClick={handleCardClick}  // Lägg till en klickbar händelse på hela kortet
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
            className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium"
            onClick={(e) => e.stopPropagation()}> {/* Förhindra att taggarna triggar kort-klicket */}
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Knapparna som är fästa på höger sida */}
      <div className="absolute right-6 top-6 flex gap-4">
        <button
          onClick={(e) => { 
            e.stopPropagation(); // Förhindra att edit-knappen triggar card-klicket
            editRecipe(recipe.id); 
            scrollToTop(); 
          }}
          className="bg-yellow-500 text-white px-6 py-3 rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Ändra
        </button>
        <button
          onClick={(e) => { 
            e.stopPropagation(); // Förhindra att delete-knappen triggar card-klicket
            deleteRecipe(recipe.id); 
          }}
          className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Ta bort
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
