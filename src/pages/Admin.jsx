// Importerar nödvändiga bibliotek och komponenter
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeButton from '../components/admin/HomeButton';
import LogoutButton from '../components/admin/LogoutButton';
import RecipeForm from '../components/admin/RecipeForm';
import RecipeCard from '../components/admin/RecipeCard';
import TrashCard from '../components/admin/TrashCard';
import AdminRecipeModal from "../components/admin/AdminRecipeModal";

const Admin = () => {
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [editingRecipeId, setEditingRecipeId] = useState(null);
  const navigate = useNavigate();
  const [trash, setTrash] = useState(JSON.parse(localStorage.getItem("trash")) || []);
  const [availableTags] = useState(["Frukost", "Lunch", "Middag", "Efterrätt", "Snacks"]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Kontrollera om användaren är autentiserad när komponenten laddas
  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") !== "true") {
      navigate("/login");
    } else {
      const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
      setRecipes(storedRecipes);
    }
  }, [navigate]);

  // Funktion för att hantera formulärinlämning
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim() || !instructions.trim()) {
      alert("Fyll i fältet med titel och instruktioner.");
      return;
    }

    const newRecipe = {
      id: editingRecipeId || Date.now(),
      title,
      instructions,
      tags: selectedTags,
    };

    let updatedRecipes;

    if (editingRecipeId) {
      updatedRecipes = recipes.map((recipe) =>
        recipe.id === editingRecipeId ? newRecipe : recipe
      );
    } else {
      updatedRecipes = [...recipes, newRecipe];
    }

    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

    setTitle("");
    setInstructions("");
    setSelectedTags([]);
    setEditingRecipeId(null);
  };

  const handleCancel = () => {
    setTitle("");
    setInstructions("");
    setSelectedTags([]);
    setEditingRecipeId(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  const handleTagSelection = (event, tag) => {
    event.preventDefault();
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
  };

  const editRecipe = (id) => {
    const recipeToEdit = recipes.find((recipe) => recipe.id === id);
    setTitle(recipeToEdit.title);
    setInstructions(recipeToEdit.instructions);
    setSelectedTags(recipeToEdit.tags);
    setEditingRecipeId(id);
  };

  const deleteRecipe = (id) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    const recipeToDelete = recipes.find((recipe) => recipe.id === id);
    const updatedTrash = [...trash, { ...recipeToDelete, deletedAt: Date.now() }];
    setRecipes(updatedRecipes);
    setTrash(updatedTrash);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    localStorage.setItem("trash", JSON.stringify(updatedTrash));
  };

  const restoreRecipe = (id) => {
    const recipeToRestore = trash.find((recipe) => recipe.id === id);
    const updatedTrash = trash.filter((recipe) => recipe.id !== id);
    const updatedRecipes = [...recipes, recipeToRestore];
    setRecipes(updatedRecipes);
    setTrash(updatedTrash);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    localStorage.setItem("trash", JSON.stringify(updatedTrash));
  };

  const confirmDelete = (id) => {
    if (window.confirm("Är du säker på att du vill ta bort detta recept permanent?")) {
      const updatedTrash = trash.filter((recipe) => recipe.id !== id);
      setTrash(updatedTrash);
      localStorage.setItem("trash", JSON.stringify(updatedTrash));
    }
  };

  const emptyTrash = () => {
    if (window.confirm("Är du säker på att du vill tömma papperskorgen?")) {
      setTrash([]);
      localStorage.setItem("trash", JSON.stringify([]));
    }
  };

  return (
    <div className="p-8 bg-[#f0f2e3] min-h-screen font-sans">
      <HomeButton />
      <LogoutButton handleLogout={handleLogout} />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-bold text-[#4a6f47]">
          {editingRecipeId ? "Redigera recept" : "Lägg till nytt recept"}
        </h1>
      </div>

      <RecipeForm
        title={title}
        setTitle={setTitle}
        instructions={instructions}
        setInstructions={setInstructions}
        selectedTags={selectedTags}
        handleTagSelection={handleTagSelection}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        editingRecipeId={editingRecipeId}
        availableTags={availableTags}
      />

      <h2 className="text-3xl font-semibold text-[#4a6f47] mt-12 mb-8 text-center">Alla recept</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            editRecipe={editRecipe}
            deleteRecipe={deleteRecipe}
            setSelectedRecipe={setSelectedRecipe}
          />
        ))}
      </div>

      <h2 className="text-3xl font-semibold text-[#4a6f47] mt-12 mb-8 relative flex justify-between items-center">
        Papperskorgen
        {trash.length > 0 && (
          <button
            onClick={emptyTrash}
            className="absolute right-4 bg-[#b88a8a] text-white text-sm sm:text-base sm:px-6 sm:py-3 px-4 py-2 rounded-full font-normal hover:bg-[#c28888] transition duration-300 ease-in-out transform hover:scale-105"
          >
            <span className="block sm:hidden">Töm</span>  {/* Visa "Töm" för små skärmar */}
            <span className="hidden sm:block">Töm papperskorgen</span> {/* Visa "Töm papperskorgen" för större skärmar */}
            <span className="block sm:hidden">Töm</span>  {/* Visa "Töm" för små skärmar */}
            <span className="hidden sm:block">Töm papperskorgen</span> {/* Visa "Töm papperskorgen" för större skärmar */}
          </button>
        )}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {trash.map((recipe) => (
          <TrashCard
            key={recipe.id}
            recipe={recipe}
            restoreRecipe={restoreRecipe}
            confirmDelete={confirmDelete}
          />
        ))}
      </div>

      {selectedRecipe && (
        <AdminRecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}
    </div>
  );
};

export default Admin;
