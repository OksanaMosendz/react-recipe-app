
function RecipeDetailCard({recipe, isLoading}){

  return(
  <>
   {!isLoading? <div>
      <h2>{recipe.name}</h2>
      <p>{recipe.area}</p>
      {recipe.img&&<img src={recipe.img} alt={recipe.name} />}
      <ul>
        {recipe.ingredients?.map((ingr, i) => 
          <li key={i}>{ingr.name} {ingr.measure}</li>
        )}
      </ul>
      <p>{recipe.instructions}</p>
    </div> : <p>...Loading...</p>}</>
  )
}

export default RecipeDetailCard;
