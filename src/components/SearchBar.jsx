import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-3 py-1 rounded-lg text-black focus:outline-none"
      />

      <button
        type="submit"
        className="bg-white text-green-600 px-3 py-1 rounded-lg font-medium hover:bg-gray-200"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
