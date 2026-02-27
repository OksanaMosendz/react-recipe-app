import RecipeItem from "./RecipeItem";
function RecipeList({ recipeList }) {
  return (
    <ul>
      {recipeList.map((recipe) => (
        <RecipeItem key={recipe.idMeal} recipe={recipe} />
      ))}
    </ul>
  );
}

export default RecipeList;
