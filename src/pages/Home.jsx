// Importerar nödvändiga bibliotek och komponenter
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminButton from "../components/home/AdminButton";
import FilterDropdown from "../components/home/FilterDropdown";
import RecipeList from "../components/home/RecipeList";
import RecipeModal from "../components/home/RecipeModal";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate();

  // Kontrollera om användaren är autentiserad
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  // Hämta recepten från localStorage
  useEffect(() => {
    try {
      const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
      setRecipes(storedRecipes);
    } catch (error) {
      console.error("Fel vid hämtning av recept:", error);
      setRecipes([]);
    }
  }, []);

  // Filtrera recepten baserat på vald tagg
  const filteredRecipes = selectedFilter
    ? recipes.filter((recipe) => recipe.tags.includes(selectedFilter))
    : recipes;

  // RENDERING AV HEM-SIDAN
  // Om användaren inte är autentiserad, navigera till inloggningssidan
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <AdminButton isAuthenticated={isAuthenticated} />

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-bold text-gray-800">Receptboken</h1>
      </div>

      <FilterDropdown selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />

      <RecipeList recipes={filteredRecipes} onRecipeClick={setSelectedRecipe} />

      {/* Visa modalen om ett recept är valt */}
      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}
    </div>
  );
};

export default Home;
