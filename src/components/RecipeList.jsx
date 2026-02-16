import RecipeCard from "./RecipeCard";

function RecipeList({ recipes, onSelect, favorites, setFavorites }) {
  if (recipes.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">
        No recipes found 😢
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-3 mt-6">
      {recipes.map((recipe) => (
        <RecipeCard 
        key={recipe.idMeal} 
        recipe={recipe}
        onSelect={onSelect}
        favorites={favorites}
        setFavorites={setFavorites} 
        />
      ))}
    </div>
  );
}

export default RecipeList;
