import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

function Navbar({ onSearch, darkMode, setDarkMode, setSidebarOpen }) {
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

        <button
          onClick={() => setSidebarOpen(true)}
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-white"
       >
        <img
          src="data:image/png;base64,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"
          alt="Profile"
          className="w-full h-full object-cover"
        />
        </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
