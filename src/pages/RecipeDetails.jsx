import RecipeDetailCard from "../features/RecipeDetailCard";

function RecipeDetails({ recipe }) {
  return (
    <>
      <button>Add</button>
      <RecipeDetailCard recipe={recipe}></RecipeDetailCard>
      <button>Back to search</button>
      <button>Add to Favorites</button>
    </>
  );
}

export default RecipeDetails;
