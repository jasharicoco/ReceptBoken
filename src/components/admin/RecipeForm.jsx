import React, { useState } from 'react';

const RecipeForm = ({ 
    title, 
    setTitle, 
    instructions, 
    setInstructions, 
    selectedTags, 
    handleTagSelection, 
    handleSubmit, 
    handleCancel,
    editingRecipeId,
    availableTags,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-lg text-gray-700 font-medium">
          Titel
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-lg p-4 w-full bg-white shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
          spellCheck="false"
        />
      </div>
  
      <div>
        <label htmlFor="instructions" className="block text-lg text-gray-700 font-medium">
            Instruktioner
        </label>
          <textarea
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="border border-gray-300 rounded-lg p-4 w-full bg-white shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
          spellCheck="false"
        />
      </div>
  
      <div>
        <label className="block text-lg text-gray-700 font-medium mb-4">Taggar</label>
        <div className="space-x-3 mb-4">
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={(event) => handleTagSelection(event, tag)}
              className={`${
                selectedTags.includes(tag)
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } px-4 py-2 rounded-full text-sm font-medium transition duration-300 ease-in-out hover:bg-teal-600 hover:text-white`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
  
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-teal-500 text-white px-6 py-3 rounded-full w-auto hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          {editingRecipeId ? "Uppdatera recept" : "Spara recept"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-500 text-white px-6 py-3 rounded-full w-auto hover:bg-gray-500 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Avbryt
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;