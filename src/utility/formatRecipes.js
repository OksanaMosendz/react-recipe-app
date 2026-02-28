function formatRecipes(fetchedRecipeList, isFavorite, imgSize){

 const formatedRecipeList=fetchedRecipeList.map((recipe)=>{
 let ingredients = [];
  for (let i = 1; i < 21; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push({
        name: recipe[`strIngredient${i}`],
        measure: recipe[`strMeasure${i}`],
      });
    }
  }

let newRecipe={
   name: recipe.strMeal,
   id: recipe.idMeal,
   area: recipe.strArea,
   instructions: recipe.strInstructions,
   img: `${recipe.strMealThumb}/${imgSize}`,
   isFavorite,
   ingredients: [...ingredients],
}
return newRecipe
 })
  return formatedRecipeList;
}

export default formatRecipes;