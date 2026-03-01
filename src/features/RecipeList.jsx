import RecipeItem from "./RecipeItem";
function RecipeList({ recipeList }) {

  return (
    <ul>
      {recipeList.map((recipe) => (
       <li key={recipe.id}><RecipeItem  recipe={recipe}  /></li>
      ))}
    </ul>
  );
}

export default RecipeList;
