function RecipeCard({ recipe }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg">
          {recipe.strMeal}
        </h3>

        <p className="text-sm text-gray-500 mt-2">
          {recipe.strCategory}
        </p>
      </div>
    </div>
  );
}

export default RecipeCard;
