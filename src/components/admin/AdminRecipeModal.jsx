import React, { useEffect } from "react";
import "./AdminRecipeModal.css"; // Importera CSS för att dölja scrollbars

const AdminRecipeModal = ({ recipe, onClose }) => {
  if (!recipe) return null;

  // Lyssna på Escape-knappen för att stänga modalen
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-gray-900/60 transition-opacity duration-300 z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#f7fff7] p-6 rounded-xl shadow-lg max-w-lg w-full relative overflow-hidden max-h-[80vh]"
        onClick={(e) => e.stopPropagation()} // Stoppar klick från att bubbla upp
      >
        {/* Stäng-knapp */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#4a6f47] rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-teal-100 transition duration-300 ease-in-out"
        >
          ✕
        </button>

        {/* Titel */}
        <h2 className="text-3xl font-semibold text-[#4a6f47]">{recipe.title || "Okänt recept"}</h2>

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
                className="bg-green-100 text-gray-700 px-4 py-2 rounded-full text-xs font-medium"
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

export default AdminRecipeModal;