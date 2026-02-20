import { useState, useEffect } from "react";
import RecipeList from "../components/RecipeList";
import RecipeModal from "../components/RecipeModal";
import Navbar from "../components/Navbar";
import { Routes, Route } from "react-router-dom";
import { House, Heart, Moon, Power } from "lucide-react"

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
     <div
  className={`absolute right-0 top-0 h-full w-80 bg-white text-orange-500 dark:bg-gray-900 shadow-2xl p-6 transform transition-transform duration-300 ${
    sidebarOpen ? "translate-x-0" : "translate-x-full"
  }`}
>

  {/* Profile Section */}
  <div className="flex flex-col items-center border-b border-gray-200 dark:border-gray-700 pb-6">

    <img
      src="https://i.pravatar.cc/150"
      alt="Profile"
      className="w-20 h-20 rounded-full object-cover mb-4 shadow-md"
    />

    <h3 className="text-lg font-semibold">John Doe</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400">
      john@example.com
    </p>

  </div>

  {/* Stats Section */}
  <div className="mt-6 space-y-4">

    <div className="flex justify-between items-center">
      <span className="text-sm font-medium">Favorites</span>
      <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
        {favorites.length}
      </span>
    </div>

  </div>

  {/* Navigation */}
  <div className="mt-8 space-y-4">

    <button
      onClick={() => setSidebarOpen(false)}
      className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      <House className="inline mr-2 w-4 h-4" />
      Home
    </button>

    <button
      onClick={() => setSidebarOpen(false)}
      className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      <Heart className="inline mr-2 w-4 h-4" />
      Favorites
    </button>

    <button
      onClick={() => setDarkMode(!darkMode)}
      className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      <Moon className="inline mr-2 w-4 h-4" />
      Toggle Dark Mode
    </button>

  </div>

  {/* Logout */}
  <div className="mt-10">
    <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition">
      <Power className="inline mr-2 w-4 h-4" />
      Logout
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
