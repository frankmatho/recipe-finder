import Navbar from "../components/Navbar";
import RecipeList from "../components/RecipeList";
import RecipeModal from "../components/RecipeModal";
import { useState } from "react";

function FavoritesPage({ darkMode, setDarkMode, favorites, setFavorites }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <>
      <Navbar 
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Your Favorites ❤️</h2>

        <RecipeList
          recipes={favorites}
          onSelect={setSelectedRecipe}
          favorites={favorites}
          setFavorites={setFavorites}
        />

        {selectedRecipe && (
          <RecipeModal
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
          />
        )}
      </div>
    </>
  );
}

export default FavoritesPage;
