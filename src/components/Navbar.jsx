import SearchBar from "./SearchBar";

function Navbar({ onSearch }) {
  return (
    <nav className="bg-green-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Left Side - Logo */}
        <h2 className="text-xl font-semibold">
          🍲 Recipe Finder
        </h2>

        {/* Right Side - Search */}
        <SearchBar onSearch={onSearch} />

      </div>
    </nav>
  );
}

export default Navbar;
