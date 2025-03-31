import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import RecipeModal from "./RecipeModal";

const RecipeList = ({ recipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <>
      {recipes.length === 0 ? (
        <p className="text-center text-xl text-gray-500">Inga recept i denna kategori.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {recipes.map((recipe) => (
            <div key={recipe.id} onClick={() => setSelectedRecipe(recipe)}>
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      )}

      {/* Visa modalen om ett recept är valt */}
      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}
    </>
  );
};

export default RecipeList;
