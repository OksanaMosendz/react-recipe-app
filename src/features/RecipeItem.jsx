function RecipeItem({ recipe }) {
  return (
    <li key={recipe.idMeal}>
      <h3>{recipe.strMeal}</h3>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <button>add</button>
      {/* <button>Edit</button>
<button>Delete</button> */}
    </li>
  );
}

export default RecipeItem;
