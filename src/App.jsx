import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavouritesPage";
import Footer from "./components/Footer";

function App() {
  const [darkMode, setDarkMode] = useState(false);
;  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className={darkMode ? "dark bg-gray-900 min-h-screen text-white" : "bg-gray-100 min-h-screen text-black"}>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          }
        />

        <Route
          path="/favorites"
          element={
            <FavoritesPage
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

