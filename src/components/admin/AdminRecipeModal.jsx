import React from "react";
import "./AdminRecipeModal.css"; // Importera CSS för att dölja scrollbars

const RecipeModal = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-gray-900/60 transition-opacity duration-300 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative overflow-hidden max-h-[80vh]"
        onClick={(e) => e.stopPropagation()} // Stoppar klick från att bubbla upp
      >
        {/* Stäng-knapp */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
        >
          ✕
        </button>

        {/* Titel */}
        <h2 className="text-2xl font-semibold text-gray-800">{recipe.title || "Okänt recept"}</h2>

        {/* Instruktioner - gör rullbar och döljer scrollbar */}
        <div className="mt-4 max-h-[300px] overflow-y-auto hide-scrollbar">
          <p className="text-gray-600 ml-2" style={{ whiteSpace: "pre-wrap" }}>
            {recipe.instructions || "Ingen beskrivning tillgänglig."}
          </p>
        </div>

        {/* Rendera taggar */}
        <div className="mt-6">
          <div className="flex gap-3 mt-3 flex-wrap">
            {recipe.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
