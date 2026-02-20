function RecipeModal({ recipe, onClose }) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-orange-500 max-w-2xl w-full rounded-xl p-6 overflow-y-auto max-h-[90vh] transform transition-all duration-300 scale-100">

        <button
          onClick={onClose}
          className="text-red-500 font-semibold mb-4"
        >
          Close
        </button>

        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-64 object-cover rounded-lg"
        />

        <h2 className="text-2xl font-bold mt-4">
          {recipe.strMeal}
        </h2>

        <h3 className="mt-4 font-semibold">Ingredients:</h3>
        <ul className="list-disc list-inside">
          {ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h3 className="mt-4 font-semibold">Instructions:</h3>
        <p className="text-sm mt-2 whitespace-pre-line">
          {recipe.strInstructions}
        </p>

      </div>
    </div>
  );
}

export default RecipeModal;
