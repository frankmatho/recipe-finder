function RecipeCard({ recipe, onSelect, favorites, setFavorites }) {

  const isFavorite = favorites.some(fav => fav.idMeal === recipe.idMeal);
  
  const toggleFavorite = (e) => {
    e.stopPropagation();

    if (isFavorite){
      setFavorites(favorites.filter(fav => fav.idMeal !== recipe.idMeal));
    } else {
      setFavorites([...favorites, recipe]);
    }
  }

  return (
    <div onClick={() => onSelect(recipe)}  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg dark:text-white">
          {recipe.strMeal}
        </h3>

        <p className="text-sm text-gray-500 mt-2">
          {recipe.strCategory}
        </p>

        <button
          onClick={toggleFavorite}
          className="mt-3 text-red-500 font-bold"
        >
          {isFavorite ? "❤️ Remove" : "🤍 Favorite"}
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;
