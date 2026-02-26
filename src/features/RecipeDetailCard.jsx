function RecipeDetailCard({ recipe }) {
  let ingredients = [];
  for (let i = 1; i < 21; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push({
        name: recipe[`strIngredient${i}`],
        measure: recipe[`strMeasure${i}`],
      });
    }
  }

  return (
    <div>
      <h2>{recipe.strMeal}</h2>
      <p>{recipe.strArea}</p>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <ul>
        {ingredients.map((ingr, i) => (
          <li key={i}>
            {ingr.name} {ingr.measure}
          </li>
        ))}
      </ul>
      <p>{recipe.strInstructions}</p>
    </div>
  );
}

export default RecipeDetailCard;
