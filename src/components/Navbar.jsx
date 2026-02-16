import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

function Navbar({ onSearch, darkMode, setDarkMode }) {
  return (
    <nav className="bg-green-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Left Side - Logo */}
        <div className="flex items-center gap-6">
          <Link to ="/" className="text-xl font-bold">
          🍲 Recipe Finder
          </Link>

          <Link to="/favorites" className="text-sm hover:underline">
           Favourites
          </Link>
        </div>
        {/* Right Side - Search */}
        <div className="flex items-center gap-4">
        <SearchBar onSearch={onSearch} />
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="bg-white text-green-600 px-3 py-1 rounded-lg font-medium">
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
