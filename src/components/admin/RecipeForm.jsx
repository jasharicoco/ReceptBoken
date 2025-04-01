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
    <form onSubmit={handleSubmit} className="space-y-8 p-8 bg-[#f7fff7] hover:bg-green-50 rounded-xl shadow-lg ml-0 transition duration-300 ease-in-out">
      <div>
        <label htmlFor="title" className="block text-xl text-gray-800 font-semibold mb-2">
          Titel
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-lg p-4 w-full bg-white shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-300 ease-in-out"
          spellCheck="false"
        />
      </div>
  
      <div>
        <label htmlFor="instructions" className="block text-xl text-gray-800 font-semibold mb-2">
            Instruktioner
        </label>
        <textarea
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="border border-gray-300 rounded-lg p-4 w-full bg-white shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-300 ease-in-out"
          spellCheck="false"
        />
      </div>
  
      <div>
        <label className="block text-xl text-gray-800 font-semibold mb-4">Taggar</label>
        <div className="space-x-3 mb-4 flex flex-wrap">
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={(event) => handleTagSelection(event, tag)}
              className={`${
                selectedTags.includes(tag)
                  ? "bg-[#96b693] text-white"
                  : "bg-green-100 text-gray-700"
              } px-4 py-2 mb-1 mt-1 rounded-full text-sm font-medium transition duration-300 ease-in-out hover:bg-[#84a381] hover:text-white`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
  
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-[#6b8d68] text-white px-6 py-3 rounded-full w-auto hover:bg-[#447049] transition duration-300 ease-in-out transform hover:scale-105"
        >
          {editingRecipeId ? "Uppdatera recept" : "Spara recept"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-500 text-white px-6 py-3 rounded-full w-auto hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Avbryt
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;
