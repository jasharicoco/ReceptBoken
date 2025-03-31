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
  const [availableTags] = useState(["Frukost", "Lunch", "Middag", "Efterrätt", "Vegetariskt", "Veganskt", "Snacks", "Bakning", "Övrigt"]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Kontrollera om användaren är autentiserad när komponenten laddas
  // Om inte, navigera till inloggningssidan
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

    // Kontrollera om titel och instruktioner inte är tomma
    if (!title.trim() || !instructions.trim()) {
      alert("Fyll i fältet med titel och instruktioner.");
      return; // Stoppa formulärinlämning om fälten är tomma
    }

    // Skapa nytt recept eller uppdatera ett befintligt
    const newRecipe = {
      id: editingRecipeId || Date.now(),
      title,
      instructions,
      tags: selectedTags,
    };
  
    let updatedRecipes;
  
    if (editingRecipeId) {
      // Om vi redigerar ett befintligt recept, uppdatera det
      updatedRecipes = recipes.map((recipe) =>
        recipe.id === editingRecipeId ? newRecipe : recipe
      );
    } else {
      // Om vi skapar ett nytt recept, lägg till det i listan
      updatedRecipes = [...recipes, newRecipe];
    }
  
    // Uppdatera state och localStorage
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  
    // Rensa fälten efter inlämning
    setTitle("");
    setInstructions("");
    setSelectedTags([]);
    setEditingRecipeId(null);
  };

  // Funktion för att avbryta redigering och rensa fälten
  const handleCancel = () => {
    setTitle("");
    setInstructions("");
    setSelectedTags([]);
    setEditingRecipeId(null);
  };

  // Funktion för att logga ut användaren
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  // Funktion för att hantera taggval
  const handleTagSelection = (event, tag) => {
    event.preventDefault();
    setSelectedTags((prevTags) => (prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]));
  };

  // Funktion för att redigera ett recept
  const editRecipe = (id) => {
    const recipeToEdit = recipes.find((recipe) => recipe.id === id);
    setTitle(recipeToEdit.title);
    setInstructions(recipeToEdit.instructions);
    setSelectedTags(recipeToEdit.tags);
    setEditingRecipeId(id);
  };

  // Funktion för att ta bort ett recept
  const deleteRecipe = (id) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    const recipeToDelete = recipes.find((recipe) => recipe.id === id);
    const updatedTrash = [...trash, { ...recipeToDelete, deletedAt: Date.now() }];
    setRecipes(updatedRecipes);
    setTrash(updatedTrash);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    localStorage.setItem("trash", JSON.stringify(updatedTrash));
  };

  // Funktion för att återställa ett recept från papperskorgen
  const restoreRecipe = (id) => {
    const recipeToRestore = trash.find((recipe) => recipe.id === id);
    const updatedTrash = trash.filter((recipe) => recipe.id !== id);
    const updatedRecipes = [...recipes, recipeToRestore];
    setRecipes(updatedRecipes);
    setTrash(updatedTrash);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    localStorage.setItem("trash", JSON.stringify(updatedTrash));
  };

  // Funktion för att bekräfta borttagning av ett recept
  const confirmDelete = (id) => {
    if (window.confirm("Är du säker på att du vill ta bort detta recept permanent?")) {
      const updatedTrash = trash.filter((recipe) => recipe.id !== id);
      setTrash(updatedTrash);
      localStorage.setItem("trash", JSON.stringify(updatedTrash));
    }
  };

  // Funktion för att tömma papperskorgen
  const emptyTrash = () => {
    if (window.confirm("Är du säker på att du vill tömma papperskorgen?")) {
      setTrash([]);
      localStorage.setItem("trash", JSON.stringify([]));
    }
  };

  // RENDERING AV ADMIN-SIDAN
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <HomeButton />
      <LogoutButton handleLogout={handleLogout} />
      <h1 className="text-5xl font-bold text-gray-800 mb-8">{editingRecipeId ? "Redigera recept" : "Lägg till nytt recept"}</h1>
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
      <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-6">Alla recept</h2>
      <div className="space-y-6">
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
      <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-6 relative flex justify-between items-center">
        Papperskorgen
        {trash.length > 0 && (
          <button
            onClick={emptyTrash}
            className="absolute right-4 bg-red-500 text-white px-4 py-2 rounded-full font-normal text-sm hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Töm
          </button>
        )}
      </h2>
      <div className="space-y-6">
        {trash.map((recipe) => (
          <TrashCard
            key={recipe.id}
            recipe={recipe}
            restoreRecipe={restoreRecipe}
            confirmDelete={confirmDelete}
          />
        ))}
      </div>

      {/* Visa modalen om ett recept är valt */}
      {selectedRecipe && (
        <AdminRecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}

    </div>
  );
};

export default Admin;
