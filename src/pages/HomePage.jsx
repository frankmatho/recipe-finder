import { useState, useEffect } from "react";
import RecipeList from "../components/RecipeList";
import RecipeModal from "../components/RecipeModal";
import Navbar from "../components/Navbar";
import { Routes, Route } from "react-router-dom";

function HomePage({ darkMode, setDarkMode, favorites, setFavorites }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const categories = [...new Set(recipes.map(r => r.strCategory))];

  useEffect(() => {
  const fetchDefaultRecipes = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken"
      );

      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Error fetching default recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchDefaultRecipes();
}, []);


  const filteredRecipes =
    selectedCategory === "All"
      ? recipes
      : recipes.filter(r => r.strCategory === selectedCategory);

  const handleSearch = async (query) => {
    if (!query) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );

      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error(error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar 
        onSearch={handleSearch}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setSidebarOpen={setSidebarOpen}
      />

      <section className="relative h-[400px] w-full overflow-hidden">

  {/* Background Image */}
  <img
    src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
    alt="Delicious food"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Text Content */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
    <h1 className="text-4xl md:text-5xl font-bold mb-4">
      Discover Amazing Recipes
    </h1>

    <p className="text-lg md:text-xl opacity-90 max-w-2xl text-orange-400">
      Search thousands of meals, explore categories, and save your favorites.
    </p>
  </div>

</section>


      <div className="max-w-7xl mx-auto p-6">

        {loading && (
          <div className="flex justify-center mt-6">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-green-600"></div>
          </div>
        )}

        <div className="flex gap-4 flex-wrap mb-4">
          <button onClick={() => setSelectedCategory("All")}>All</button>

          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <RecipeList
          recipes={filteredRecipes}
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

        {sidebarOpen && (
        <div className="fixed inset-0 z-50">

        {/* Dark background */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setSidebarOpen(false)}
      ></div>

    {/* Sidebar */}
     <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl p-6 transition-transform duration-300">

      <h2 className="text-xl text-orange-500 font-bold mb-6">Menu</h2>

      <div className="flex text-orange-500 flex-col gap-4">
        <button className="cursor-pointer" onClick={() => setSidebarOpen(false)}>
          Profile
        </button>

        <button className="cursor-pointer" onClick={() => setSidebarOpen(false)}>
          Favorites
        </button>

        <button className="cursor-pointer" onClick={() => setDarkMode(!darkMode)}>
          Toggle Dark Mode
        </button>

        <button className="cursor-pointer" onClick={() => setSidebarOpen(false)}>
          Close
        </button>
      </div>
    
     </div>
  </div>
)}

      </div>
    </>
  );
}

export default HomePage;
