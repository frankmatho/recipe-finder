import { useState } from 'react'
import Navbar from './components/Navbar'
//import Footer from './components/Footer'
import RecipeList from './components/RecipeList';


function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  //const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = async (query) => {
    if (!query) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}
`
      );

      const data = await response.json();

      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }

    setLoading(false);
  };

  return (
    <>  
      <Navbar onSearch={handleSearch} />

      <div className="max-w-6xl mx-auto p-6">
        {loading && <p className="text-center">Loading...</p>}

        <RecipeList recipes={recipes} />
      </div>
    </>
  )
}

export default App
