import RecipeCard from "./RecipeCard";

function RecipeList({ recipes }) {
  if (!recipes.length) {
    return (
      <p className="text-center text-gray-500 mt-6">
        Search for a recipe to get started 🍽
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-3 mt-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipeList;
