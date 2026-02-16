import { useState } from 'react'
import Navbar from './components/Navbar'
//import Footer from './components/Footer'
import RecipeList from './components/RecipeList';
import RecipeModal from './components/RecipeModal'
import { useEffect } from 'react'
import { Routes, Route } from "react-router-dom";


function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  })
  //const [searchQuery, setSearchQuery] = useState("");
  const categories = [...new Set(recipes.map(r => r.strCategory))];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredRecipes =
   selectedCategory === "All"
    ? recipes
    : recipes.filter(r => r.strCategory === selectedCategory);

  useEffect(() => {

    const fetchDefault = async () =>  {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken"
        );
        const data = await response.json();
        setRecipes(data.meals || [])
      }catch (error){
        console.error(error);
      }
    };

    fetchDefault();
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites], []); 
  
  const handleSearch = async (query) => {
    if (!query) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}
`
      );

      const data = await response.json();

      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <> 
      <div className={darkMode ? "dark bg-gray-900 min-h-screen text-white" : "bg-gray-100 min-h-screen text-black"}> 
      <Navbar 
      onSearch={handleSearch} 
      darkMode={darkMode} 
      setDarkMode={setDarkMode}
      />
      
      <Routes>
        <Route path="/" element={
          <div className="max-w-6xl mx-auto p-6">
          {loading && (
            <div className="flex justify-center mt-6">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-green-600"></div>
            </div>      
        )}
        
        <div className="flex gap-4 flex-wrap mb-4">
          <button onClick={() => setSelectedCategory("All")}>
             All
          </button>

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
        onSelect = {setSelectedRecipe}
        favorites={favorites}
        setFavorites={setFavorites}        
        />

        {selectedRecipe && (
          <RecipeModal recipe={selectedRecipe} 
          onClose={() => setSelectedRecipe(null)} 
          />
        )}
        </div>
        } />

        <Route 
        path="/favorites" 
        element={
          <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Favorites❤️</h2>
            <RecipeList 
              recipes={favorites}
              onSelect = {setSelectedRecipe}
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
        }
        />

        </Routes>
        </div>
    </>
  )
}

export default App
