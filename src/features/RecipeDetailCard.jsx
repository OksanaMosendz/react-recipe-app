
function RecipeDetailCard({recipe}){

console.log(recipe.ingredients)
  return (
    <div>
      <h2>{recipe.name}</h2>
      <p>{recipe.area}</p>
      <img src={recipe.img} alt={recipe.name} />
      <ul>
        {recipe.ingredients?.map((ingr, i) => (
          <li key={i}>
            {ingr.name} {ingr.measure}
          </li>
        ))}
      </ul>
      <p>{recipe.instructions}</p>
    </div>
  );
}

export default RecipeDetailCard;
